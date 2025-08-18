import { Text, Spinner } from "@chakra-ui/react";
import { useTotalVideoSize } from "../hooks/useVideoSize";
import { formatBytes } from "../utils/dateFormat";

const TotalVideoUsage = () => {
  const { data, isLoading, error } = useTotalVideoSize();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Falha ao carregar tamanho total</Text>;

  return <Text>Tamanho total dos vídeos: {formatBytes(data?.total_video_size_bytes ?? 0)}</Text>;
}

export { TotalVideoUsage }