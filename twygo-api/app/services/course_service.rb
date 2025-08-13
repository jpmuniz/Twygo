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
end
