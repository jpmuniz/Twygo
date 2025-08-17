import { useCreateCourse } from "./useCreateCourse";
import { useAttachVideoByUrl, useAttachVideoFiles } from "./useAttachVideo";
import type { Course } from "../types"

type Inputs = {
  course: Course;     
  videoUrl?: string;             
  videoFiles?: FileList | null;   
};

const useCreateCourseWithVideo = () => {
  const createCourse = useCreateCourse();
  const attachByUrl = useAttachVideoByUrl();
  const attachFiles = useAttachVideoFiles();

  const isPending =
    createCourse.isPending || attachByUrl.isPending || attachFiles.isPending;

  async function run({ course, videoUrl, videoFiles }: Inputs) {

    const created = await createCourse.mutateAsync(course);
    const courseId = created.id;

    if (videoFiles && videoFiles.length > 0) {
      await attachFiles.mutateAsync({ courseId, files: videoFiles });
    } 
    if (videoUrl && videoUrl.trim()) {
      await attachByUrl.mutateAsync({ courseId, url: videoUrl.trim() });
    }

    return created;
  }

  return { run, isPending, createCourse, attachByUrl, attachFiles };
}

export { useCreateCourseWithVideo }
