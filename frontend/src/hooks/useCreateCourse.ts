import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../api/service";
import type { Course } from "../types";

const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Course) => createCourse(payload),
    onSuccess: () => {
      queryClient.setQueryData<Course[] | undefined>(
        ["courses-with-videos"],
        queryClient.invalidateQueries({ queryKey: ["courses-with-videos"] })
      );
    },
  });
}

export { useCreateCourse }
