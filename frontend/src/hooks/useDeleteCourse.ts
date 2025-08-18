import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../api/service";
import type { Course, Video } from "../types";

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: number | string) => {
      const res = await deleteCourse(courseId)

      if (!res.ok) {
        throw new Error(`Erro ${res.status} ao excluir o curso`);
      }
      return { courseId };
    },

    onMutate: async (courseId: number | string) => {
      await queryClient.cancelQueries({ queryKey: ["courses-with-videos"] });

      const previous = queryClient.getQueryData<Course[]>(["courses-with-videos"]);

      queryClient.setQueryData<Course[]>(
        ["courses-with-videos"],
        (courses: Course[] | undefined) =>
        (courses ?? []).filter((course) => course.id !== courseId)
      );
      return { previous };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (_err: any, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(["courses-with-videos"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses-with-videos"] });
    },
  });
}
