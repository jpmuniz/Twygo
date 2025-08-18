
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse, uploadEditCourseVideos } from "../api/service";
import type { Course, CourseVideoItem } from "../types";

type EditInput = {
  courseId: string;
  course: Partial<Pick<Course, "title" | "description" | "end_date">>;
  videoFiles?: FileList | null;
  videoUrl?: string;
};

const useEditCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, course, videoFiles }: EditInput) => {
      const updated = await updateCourse(courseId, course);
      console.log("19-----", updated);
      if (videoFiles && videoFiles.length > 0) {
        await uploadEditCourseVideos(courseId, videoFiles);
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
