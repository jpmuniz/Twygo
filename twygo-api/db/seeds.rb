service = CourseService.new

service.add_course(
  title: "Ruby on Rails - Twygo",
  description: "Curso básico de Rails",
  end_date: Date.new(2025, 12, 31)
)

service.add_course(
  title: "React + Rails - Twygo",
  description: "Integração de frontend com backend",
  end_date: Date.new(2025, 11, 30)
)
