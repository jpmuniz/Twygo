module Api
  class CoursesController < ApplicationController
    before_action :set_service

    def index
      render json: @service.list_courses
    end

  def show
    course = Course.find_by(id: params[:id])
    if course
      render json: course
    else
      render json: { error: "Curso não encontrado." }, status: :not_found
    end
  end


    def create
      course = @service.add_course(course_params)
      if course.persisted?
        render json: course, status: :created
      else
        render json: { errors: course.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      course = @service.update_course(params[:id], course_params)
      if course.errors.any?
        render json: { errors: course.errors.full_messages }, status: :unprocessable_entity
      else
        render json: course
      end
    end

    def destroy
      @service.delete_course(params[:id])
      render json: { message: "O curso foi deletado com sucesso!" }
    end
    def replace_videos
      course = Course.find_by(id: params[:id])
      return render json: { error: "Curso não encontrado." }, status: :not_found unless course

      files = normalize_files_param(params[:videos]) || []
      url   = params[:video_url].presence

      if files.any?
        course.videos.purge
        course.videos.attach(files)
        return render json: { message: "Vídeos substituídos com sucesso!" }, status: :ok
      end

      if url
        io = URI.open(url)
        filename     = File.basename(URI.parse(url).path.presence || "video.mp4")
        content_type = (defined?(Marcel) ? Marcel::MimeType.for(io) : nil) || "video/mp4"

        course.videos.purge
        course.videos.attach(io: io, filename: filename, content_type: content_type)
        return render json: { message: "Vídeo substituído via URL com sucesso!" }, status: :ok
      end

      render json: { error: "Envie 'videos[]' ou 'video_url'." }, status: :unprocessable_entity
    end  
    def normalize_files_param(raw)
      return nil if raw.blank?

      files =
        case raw
        when ActionController::Parameters then raw.to_unsafe_h.values
        when Hash                         then raw.values
        else Array(raw)
        end

      files.compact.reject { |f| f.respond_to?(:blank?) ? f.blank? : false }
    end
    
    private

    def set_service
      @service = CourseService.new
    end

    def course_params
      params.require(:course).permit(:title, :description, :end_date)
    end
  end
end
