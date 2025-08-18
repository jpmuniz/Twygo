// hooks/useCreateCourseWithVideo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse, uploadVideoFiles } from "../api/service";
import type { Course } from "../types";

type CreateInput = {
  course: {
    title: string;
    end_date: string;        
    description?: string;
  };
  videoFiles?: FileList | null;
};

export function useCreateCourseWithVideo() {
  const qc = useQueryClient();

  return useMutation<Course, Error, CreateInput>({
    mutationFn: async ({ course, videoFiles }) => {
      const created = await createCourse(course); 
      if (videoFiles && videoFiles.length > 0) {
        await uploadVideoFiles(created.id, videoFiles); 
      }
      return created;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses-with-videos"] });
    },
  });
}
