import { useQuery } from "@tanstack/react-query";
import { fetchCoursesAndVideos } from "../api/service";
import type { Course } from "../types";

const useGetCourses = () =>{
  return useQuery<Course[]>({
    queryKey: ["courses-with-videos"],
    queryFn: fetchCoursesAndVideos,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
    select: (data: Course) => [...data].reverse(),
  });
}

export { useGetCourses }
