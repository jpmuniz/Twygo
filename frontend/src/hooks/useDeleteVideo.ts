import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../api/service";
import type { Video } from "../types";

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const res = await deleteCourse(id);
      console.log(res);
      if (!res.ok) {
        throw new Error(`Erro ${res.status} ao excluir o vídeo`);
      }
      return { id };
    },

    
    onMutate: async (id: number | string) => {
      await queryClient.cancelQueries({ queryKey: ["courses-with-videos"] });
      const previous = queryClient.getQueryData<[]>(["courses-with-videos"]);

      queryClient.setQueryData<[]>(
        ["courses-with-videos"],
        (courses: unknown) =>
          (courses ?? []).map((course: { videos: Video; }) => ({
            ...course,
            videos: (course.videos ?? []).filter((v: any) => v.id !== id),
          }))
      );

      return { previous };
    },

    onError: (_err: unknown, _vars: unknown, context: { previous: unknown; }) => {
      if (context?.previous) {
        queryClient.setQueryData(["courses-with-videos"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses-with-videos"] });
    },
  });
}

