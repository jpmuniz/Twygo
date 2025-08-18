import { useMemo, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogBackdrop,
  Portal,
  Alert
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FlashAlert } from "./FlashAlert";
import { CourseCard } from "./CourseCard";
import { VideoActionButton } from "./VideoActionButton";
import type { Course, CourseVideoItem } from "../types";

type Props = {
  courses: Course[];
};

const CourseCards = ({ courses }: Props) => {
   const navigate = useNavigate();
   
  const sortCourses = useMemo<Course[]>(
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
  const [selected, setSelected] = useState<CourseVideoItem | null>(null);
  const [flashOpen, setFlashOpen] = useState(false);
  const [flashStatus, setFlashStatus] = useState<"success" | "error">("success");
  const [flashTitle, setFlashTitle] = useState("");
  const onEditVideo = (course: CourseVideoItem) => {
    navigate(`/courses/${course.id}/edit`, {
      state: {
        editing: true,
        initial: {
          id: course.id,  
          title: course.title,
          description: course.description,
          endDate: course.end_date
        },
      },  
    })    
  }

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Vídeos dos Cursos
      </Text>
        <FlashAlert
        open={flashOpen}
        onOpenChange={setFlashOpen}
        status={flashStatus}
        title={flashTitle}
        position="top-right"
        duration={3000}
      />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={3}>
        {sortCourses.map((course) => (
          <CourseCard
            key={`${course.id}-${course.title}`}
            course={course}
            onPlay={() => setSelected(course)}
            onEdit={() => onEditVideo(course)}
            onDeleted={(status) => {
              setFlashStatus(status);
              setFlashTitle(status === "success" ? "Curso excluído com sucesso!" : "Erro ao excluir o curso.");
              setFlashOpen(true);
            }}
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
