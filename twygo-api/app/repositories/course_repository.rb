class CourseRepository
  def all
    Course.all
  end

  def find(id)
    Course.find_by(id: id)
  end

  def create(attrs)
    Course.create(attrs)
  end

  def update(id, attributes)
    course = find(id)
    return nil unless course

    course.update(attributes)
    course
  end

  def delete(id)
    course = find(id)
    return false unless course

    course.destroy
    course.destroyed?
  end

  def attach_videos(id, videos)
    course = find(id)
    return nil unless course

    course.videos.attach(videos)
    course
  end

  def total_video_size
    Course.all.sum { |c| c.videos.sum(&:byte_size) }
  end
end
