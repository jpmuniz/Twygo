class CourseService
  def initialize(repository = CourseRepository.new)
    @repository = repository
  end

  def list_courses
    @repository.all
  end

  def add_course(attrs)
    @repository.create(attrs)
  end

  def update_course(id, attrs)
    @repository.update(id, attrs)
  end

  def delete_course(id)
    @repository.delete(id)
  end
  
  def replace_course_videos(id, files_or_url)
    course = @repository.find(id)
    return nil unless course

    if files_or_url.is_a?(Array)
      course.videos.purge
      course.videos.attach(files_or_url)
    elsif files_or_url.is_a?(String)
      io = URI.open(files_or_url)
      filename     = File.basename(URI.parse(files_or_url).path.presence || "video.mp4")
      content_type = (defined?(Marcel) ? Marcel::MimeType.for(io) : nil) || "video/mp4"
      course.videos.purge
      course.videos.attach(io: io, filename: filename, content_type: content_type)
    end

    course
  end
end
