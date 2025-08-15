import { useState, useEffect } from "react";
import { fetchCoursesAndVideos } from "../api/service";
import type { Course } from "../types";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const getCourses = async () => {
    try {
     const data = await fetchCoursesAndVideos();
     setCourses(data);
    } catch {
        setError("Erro ao buscar cursos");
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    getCourses();
  }, []);

  return { courses, loading, error };
};
