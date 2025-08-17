import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../api/service";
import type { Course, CreateCoursePayload } from "../types";

const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCoursePayload) => createCourse(payload),
    onSuccess: (created: Course) => {
      queryClient.setQueryData<Course[] | undefined>(
        ["courses-with-videos"],
        (course: Course) => (course ? [{ ...created, videos: created.videos ?? [] }, ...course] : course)
      );
    },
  });
}

export { useCreateCourse }
