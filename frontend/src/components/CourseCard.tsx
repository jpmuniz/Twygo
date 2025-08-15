import { useRef, useState, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  AspectRatio
} from "@chakra-ui/react";
//import { TriangleRightIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { TruncatedWithTooltip } from "./TruncatedWithTooltip";
import { truncate } from "./helpers";
import type { Course } from "../types";

type CourseCardProps = {
  course: Course;
  onPlay: () => void; 
  onEdit?: () => void;
  onDelete?: () => void;
};


const CourseCard = ({ course, onPlay, onEdit, onDelete }: CourseCardProps) => {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const truncatedTitle = useMemo(() => truncate(course.title, 48), [course.title]);
  const truncatedDesc  = useMemo(() => truncate(course.description, 86), [course.description]);

  const showFullTitle = !!course.title && course.title?.length > 48;
  const showFullDesc  = !!course.description && course.description?.length > 86;

  return (
    <Box
      role="group"
      position="relative"
      rounded="xl"
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
      <AspectRatio ratio={16 / 9}>
        <Box
          as="video"
          ref={vidRef}
          src={course.url}
          muted
          playsInline
          loop
          preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </AspectRatio>

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
        <IconButton
          aria-label="Assistir"
          //icon={<TriangleRightIcon />}
          size="sm"
          colorScheme="green"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        />
        <IconButton
          aria-label="Editar"
          //icon={<EditIcon />}
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
        />
        <IconButton
          aria-label="Excluir"
          //icon={<DeleteIcon />}
          size="sm"
          variant="outline"
          colorScheme="red"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        />
      </Flex>
    </Box>
  );
}

export { CourseCard }
