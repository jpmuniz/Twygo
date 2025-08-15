import { useMemo, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogBackdrop,
  IconButton,
  Portal
} from "@chakra-ui/react";
//import { CloseIcon } from "@chakra-ui/icons";
import { CourseCard } from "./CourseCard";

type Video = {
  id: number | string;
  filename: string;
  url: string;
  byte_size: number;
  courseTitle?: string;
  courseDescription?: string;
};

type Course = {
  id: number;
  title: string;
  description?: string;
  videos: Video;
};

type Props = {
  courses: Course[];
  onEditVideo?: (v: Video) => void;
  onDeleteVideo?: (v: Video) => void;
};

const CourseCards = ({ courses, onEditVideo, onDeleteVideo }: Props) => {
  const sortCourses = useMemo<Video[]>(
    () =>
      (courses ?? []).flatMap((course) =>
        (course.videos ?? []).map((video: Course) => ({
          ...video,
          title: course.title,
          description: course.description,
        })) 
      ),
    [courses]
  );

  const [selected, setSelected] = useState<Video | null>(null);

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Vídeos dos Cursos
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={3}>
        {sortCourses.map((course) => (
          <CourseCard
            key={`${course.id}-${course.filename}`}
            course={course}
            onPlay={() => setSelected(course)}
            onEdit={() => onEditVideo?.(course)}
            onDelete={() => onDeleteVideo?.(course)}
          />
        ))}
      </SimpleGrid>
      <DialogRoot
        open={!!selected}
        onOpenChange={(e) => {
          if (!e.open) setSelected(null);
        }}
      >
        <Portal>
          <DialogBackdrop
            bg="blackAlpha.800"
            position="fixed"
            inset="0"
            zIndex={9998}
          />

          <DialogContent
            position="fixed"
            inset="0"
            w="100vw"
            h="100vh"
            maxW="100vw"
            maxH="100vh"
            p={0}
            rounded="0"
            overflow="hidden"
            bg="black"
            zIndex={9999}
            boxShadow="none"
          >
            <IconButton
              aria-label="Fechar"
              //icon={<CloseIcon boxSize={3} />}
              position="absolute"
              top={{ base: 3, md: 4 }}
              right={{ base: 3, md: 4 }}
              zIndex={2}
              variant="ghost"
              color="whiteAlpha.900"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={() => setSelected(null)}
            />
            <DialogBody p={0}>
              {selected && (
                <Box
                  as="video"
                  src={selected.url}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", 
                    display: "block",
                    backgroundColor: "black",
                  }}
                />
              )}
            </DialogBody>
          </DialogContent>
        </Portal>
      </DialogRoot>


    </Box>
  );
}

export { CourseCards }
