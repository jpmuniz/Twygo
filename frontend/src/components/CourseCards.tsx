import { useMemo, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogBackdrop,
  Portal
} from "@chakra-ui/react";
import { CourseCard } from "./CourseCard";
import { VideoActionButton } from "./VideoActionButton";

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
  end_date: string
};

type Props = {
  courses: Course[];
  onEditVideo?: (v: Video) => void;
};

const CourseCards = ({ courses, onEditVideo }: Props) => {
  const sortCourses = useMemo<Video[]>(
    () =>
      (courses ?? []).flatMap((course) =>
        (course.videos ?? []).map((video: Course) => ({
          ...video,
          title: course.title,
          description: course.description,
          id: course.id,
          end_date: course.end_date
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
          <VideoActionButton
            kind="close"
            onClick={() => setSelected(null)}
            title="Fechar"
            ariaLabel="Fechar"
            size={40}
            iconSize={20}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
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
