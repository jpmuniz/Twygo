// src/hooks/useAttachVideo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideoFiles } from "../api/service";

const useAttachVideoFiles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { courseId: number; files: FileList }) =>
      uploadVideoFiles(vars.courseId, vars.files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses-with-videos"] });
    },
  });
}

export {useAttachVideoFiles}
