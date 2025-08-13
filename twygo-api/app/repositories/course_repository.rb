class CourseRepository
  def all
    Course.all
  end

  def find(id)
    Course.find(id)
  end

  def create(attrs)
    Course.create(attrs)
  end

  def update(id, attributes)
    course = Course.find_by(id: id)
    return nil unless course

    course.update(attributes)
    course
  end

  def delete(id)
    course = Course.find_by(id: id)
    return false unless course
    course.destroy
    true
  end
end
