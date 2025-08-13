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

  def all_videos
    @repository.all.flat_map(&:videos)
  end
end
