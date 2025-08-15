class VideosController < ApplicationController
  include ActiveStorage::SetCurrent

  def show
    blob = ActiveStorage::Blob.find(params[:id])

    unless blob.content_type.start_with?("video/")
      render plain: "Not a video", status: :unsupported_media_type and return
    end

    # Habilita avanço no vídeo
    response.headers["Accept-Ranges"] = "bytes"

    # Stream do vídeo
    send_data blob.download,
              type: blob.content_type,
              disposition: "inline"
  end
end
