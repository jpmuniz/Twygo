
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse, uploadVideoByUrl, uploadVideoFiles } from "../api/service";
import type { Course, CourseVideoItem } from "../types";

type EditInput = {
  courseId: string;
  course: Partial<Pick<Course, "title" | "description" | "end_date">>;
  videoFiles?: FileList | null;
  videoUrl?: string;
};

const useEditCourse = () =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, course, videoFiles, videoUrl }: EditInput) => {
      const updated = await updateCourse(courseId, course);

      if (videoFiles && videoFiles.length > 0) {
        await uploadVideoFiles(courseId, videoFiles);
      } 
      if (videoUrl && videoUrl.trim()) {
        await uploadVideoByUrl(courseId, videoUrl.trim());
      }

      return updated as Course;
    },
    onSuccess: (updated: CourseVideoItem) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.setQueryData(["course", updated.id], updated);
      queryClient.invalidateQueries({ queryKey: ["courses-with-videos"] })
    },
  });
}

export { useEditCourse }
