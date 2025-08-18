import { useRef, useState, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import { SmartVideo } from "./SmartVideo";
import { TruncatedWithTooltip } from "./TruncatedWithTooltip";
import { VideoActionButton } from "./VideoActionButton";
import { useDeleteCourse } from "../hooks/useDeleteCourse";
import { ConfirmDialog } from "./ConfirmDialog";
import { truncate } from "./helpers";
import type { Course } from "../types";

type CourseCardProps = {
  course: Course;
  onPlay: () => void; 
  onEdit?: () => void;
};


const CourseCard = ({ course, onPlay, onEdit }: CourseCardProps) => {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { mutate: deleteCourse, isPending: deleting } = useDeleteCourse();

  const truncatedTitle = useMemo(() => truncate(course.title, 48), [course.title]);
  const truncatedDesc  = useMemo(() => truncate(course.description, 86), [course.description]);

  const showFullTitle = !!course.title && course.title?.length > 48;
  const showFullDesc  = !!course.description && course.description?.length > 86;

  return (
    <Box
      role="group"
      position="relative"
      rounded="xl"
      cursor="pointer"
      overflow="hidden"
      bg="gray.900"
      _hover={{ zIndex: 2, transform: "scale(1.06)" }}
      transition="transform .18s ease, box-shadow .18s ease"
      boxShadow="md"
      onMouseEnter={() => {
        setHovered(true);
        vidRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        vidRef.current?.pause();
      }}
    >
      <SmartVideo src={course.url} hoverPlay ratio={16/9} />
      <Box
        position="absolute"
        insetX={0}
        bottom={0}
        bgGradient="linear(to-t, rgba(0,0,0,.88), rgba(0,0,0,0.35))"
        px={3}
        pt={2}
        pb={3}
      >
        <TruncatedWithTooltip label={course.title || ""} enabled={showFullTitle}>
          <Text color="white" fontSize="sm" fontWeight="semibold">
            {truncatedTitle}
          </Text>
        </TruncatedWithTooltip>

        {course.description && (
          <TruncatedWithTooltip label={course.description} enabled={showFullDesc}>
            <Text color="whiteAlpha.800" fontSize="xs">
              {truncatedDesc}
            </Text>
          </TruncatedWithTooltip>
        )}
      </Box>

      <Flex
        align="center"
        justify="center"
        gap={2}
        position="absolute"
        inset={0}
        bg="blackAlpha.400"
        opacity={hovered ? 1 : 0}
        pointerEvents={hovered ? "auto" : "none"}
        transition="opacity .15s ease"
      >
      <Flex
        position="absolute"
        top="20px"
        left="30px"
        gap="12px"
        pointerEvents="auto"
      >
      <VideoActionButton
        kind="play"
        onClick={onPlay}
        title="Play"
        ariaLabel="Reproduzir"
      />
      <VideoActionButton
        kind="edit"
        onClick={onEdit}
        title="Editar"
        ariaLabel="Editar vídeo"
      />
      <VideoActionButton
        kind="delete"
        onClick={()=> setIsDelete(true)}
        title="Excluir"
        ariaLabel="Excluir vídeo"
      />
      <ConfirmDialog
        open={isDelete}
        title="Excluir vídeo"
        description="Tem certeza que deseja excluir este vídeo? Essa ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        confirmColorScheme="red"
         isLoading={deleting}
        onCancel={() => setIsDelete(false)}
        onConfirm={() => {
          deleteCourse(course.id, {
            onSuccess: () => {
            },
            onError: () => {
            },
          });
        }}
      />

    </Flex>

      </Flex>
    </Box>
  );
}

export { CourseCard }
