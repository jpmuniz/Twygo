import { useQuery } from "@tanstack/react-query";
import { videosSize } from "../api/service";

export function useTotalVideoSize() {
  return useQuery<number>({
    queryKey: ["video-size", "total"],
    queryFn: videosSize,
    staleTime: 60_000,          
    refetchOnWindowFocus: false
  });
}


