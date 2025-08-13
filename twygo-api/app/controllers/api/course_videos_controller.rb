module Api
  class CourseVideosController < ApplicationController
    before_action :set_service

    def upload
      course = @service.attach_videos(params[:id], params[:videos])
      if course
        render json: { message: "Vídeos adicionados com sucesso!" }
      else
        render json: { error: "Curso não encontrado." }, status: :not_found
      end
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
