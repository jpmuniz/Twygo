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
end
