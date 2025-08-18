import { CourseCards } from "../components/CourseCards";
import { useGetCourses } from "../hooks/useGetCourses"; 

const CourseGallery = () => {
  const { data: courses, loading, error } = useGetCourses();
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar cursos</div>;

  return <CourseCards courses={courses} />;
}

export { CourseGallery }
