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
end
