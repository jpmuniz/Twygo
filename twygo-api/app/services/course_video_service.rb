class CourseVideoService
  def initialize(repository = CourseRepository.new)
    @repository = repository
  end

  def attach_videos(course_id, videos)
    @repository.attach_videos(course_id, videos)
  end

  def all_courses_video_size
    @repository.total_video_size
  end

  def show_videos(course_id)
    course = @repository.find(course_id)
    return nil unless course
    course.videos
  end

def courses_with_videos
  @repository.upcoming.map do |course|
    {
      id: course.id,
      title: course.title,
      description: course.description,
      end_date: course.end_date,
      has_videos: course.videos.attached?,
      videos: course.videos.map do |v|
        {
          filename: v.filename.to_s,
          byte_size: v.blob.byte_size,
          url: Rails.application.routes.url_helpers.video_url(v.id, host: "http://localhost:3001")
        }
      end
    }
  end
end

  def replace_videos(id, files)
    course = find(id)
    return nil unless course
    course.videos.purge
    course.videos.attach(files)
    course
  end
  
  def all_videos
    @repository.all.flat_map(&:videos)
  end
end
