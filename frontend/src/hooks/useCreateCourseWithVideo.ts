import { useCreateCourse } from "./useCreateCourse";
import {useAttachVideoFiles } from "./useAttachVideo";

type Inputs = {
  course :{
    title: string,
    description?: string,
    end_date: string,             
    videoFiles?: FileList | null;   
  }
};

const useCreateCourseWithVideo = () => {
  const createCourse = useCreateCourse();
  const attachFiles = useAttachVideoFiles();

  const isPending =
    createCourse.isPending || attachFiles.isPending;

  async function run({ course }: Inputs) {

    const created = await createCourse.mutateAsync(course);
    const courseId = created.id;

    if (course?.videoFiles && course?.videoFiles.length > 0) {
      await attachFiles.mutateAsync({ courseId, files: course?.videoFiles });
    } 

    return created;
  }

  return { run, isPending, createCourse, attachFiles };
}

export { useCreateCourseWithVideo }
