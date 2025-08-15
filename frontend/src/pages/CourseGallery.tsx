import { CourseCards } from "../components/CourseCards";
import { useCourses } from "../hooks/useCourses"; 

const CourseGallery = () => {
  const { courses, loading, error } = useCourses();
  console.log("CourseGallery", courses);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar cursos</div>;

  return <CourseCards courses={courses} />;
}

export { CourseGallery }
