class CourseRepository
  def all
    Course.all
  end

  def upcoming
     Course
       .with_attached_videos                  
       .where('end_date >= ?', Date.current)  
       .order(end_date: :asc, id: :desc)      
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

  def videos_for_course(course_id)
    course = Course.find_by(id: course_id)
    return nil unless course
    course.videos
  end

  def total_video_size
    Course.all.sum { |c| c.videos.sum(&:byte_size) }
  end
end
