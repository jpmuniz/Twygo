import { useQuery } from "@tanstack/react-query";
import { fetchCoursesAndVideos } from "../api/service";
import type { Course } from "../types";

const useCourses = () =>{
  return useQuery<Course[]>({
    queryKey: ["courses-with-videos"],
    queryFn: fetchCoursesAndVideos,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export { useCourses }
