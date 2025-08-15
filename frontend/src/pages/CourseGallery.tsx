import { CourseCards } from "../components/CourseCards";
import { useCourses } from "../hooks/useCourses"; 

const CourseGallery = () => {
  const { data: courses, loading, error } = useCourses();
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar cursos</div>;

  return <CourseCards courses={courses} />;
}

export { CourseGallery }
