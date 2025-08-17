// src/hooks/useAttachVideo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideoFiles, uploadVideoByUrl } from "../api/service";

const useAttachVideoByUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { courseId: number; url: string }) =>
      uploadVideoByUrl(vars.courseId, vars.url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses-with-videos"] });
    },
  });
}

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

export {useAttachVideoByUrl, useAttachVideoFiles}
