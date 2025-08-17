module Api
  class CourseVideosController < ApplicationController
    before_action :set_service

    def upload
      course = Course.find_by(id: params[:id])
      return render json: { error: "Curso não encontrado." }, status: :not_found unless course

      if params[:videos].present?
        Array(params[:videos]).each do |file|
          course.videos.attach(file)
        end
        return render json: { message: "Vídeos adicionados com sucesso!" }
      end

      if params[:video_url].present?
        url = params[:video_url].to_s
        io = URI.open(url) # precisa require "open-uri"
        filename = File.basename(URI.parse(url).path.presence || "video.mp4")
        course.videos.attach(io: io, filename: filename, content_type: "video/mp4")
        return render json: { message: "Vídeo anexado via URL com sucesso!" }
      end

      render json: { error: "Envie 'videos[]' ou 'video_url'." }, status: :unprocessable_entity
    end


    def show_videos
      videos = @service.show_videos(params[:id])
      if videos
        render json: videos.map { |v| 
          { 
            filename: v.filename.to_s, 
            byte_size: v.blob.byte_size, 
            url: Rails.application.routes.url_helpers.rails_blob_url(v, only_path: true) 
          } 
        }
      else
        render json: { error: "Curso não encontrado." }, status: :not_found
      end
    end

    def video_sizes
      render json: { total_video_size_bytes: @service.all_courses_video_size }
    end

    def courses_with_videos
      render json: @service.courses_with_videos
    end

    def all_videos
      videos = @service.all_videos
      video_urls = videos.map { |v| url_for(v) }
      render json: { videos: video_urls }
    end

    private

    def set_service
      @service = CourseVideoService.new
    end
  end
end
