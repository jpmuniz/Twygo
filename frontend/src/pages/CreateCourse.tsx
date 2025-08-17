import { useState, type ChangeEvent } from "react";
import { Box, Input, Textarea, Button, Text } from "@chakra-ui/react";
import { useCreateCourseWithVideo } from "../hooks/useCreateCourseWithVideo";
import { validateCreateCourse } from "./courseValidation";

type Errors = {
  title?: string;
  endDate?: string;
  video?: string;     
  videoUrl?: string;  
};

const CreateCourse = () => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(""); 
  const [videoUrl, setVideoUrl] = useState(""); 
  const [videoFiles, setVideoFiles] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const { run } = useCreateCourseWithVideo();
  
  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const result = validateCreateCourse({
      title,
      description,
      endDateBr: endDate,
      videoUrl,
      videoFiles,
    });

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }    

    setSubmitting(true);
    try {
 
    await run({
    course: {
        title: title.trim(),
        description: description.trim() || undefined,
        end_date: endDate, 
    },
    videoFiles,  
    videoUrl: videoUrl.trim(), 
    });

      setFeedback({ kind: "ok", msg: "Curso criado e vídeo anexado com sucesso!" });

      setTitle("");
      setDescription("");
      setEndDate("");
      setVideoUrl("");
      setVideoFiles(null);
      setErrors({});
    } catch (err: any) {
      setFeedback({ kind: "err", msg: String(err?.message || err) });
    } finally {
      setSubmitting(false);
    }
  }

  const onChangeFiles = (ev: ChangeEvent<HTMLInputElement>) => {
    setVideoFiles(ev.currentTarget.files);
    setErrors((p) => ({ ...p, video: undefined }));
  }

  return (
    <Box maxW="680px" mx="auto" p={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Criar curso
      </Text>

      <form onSubmit={onSubmit} noValidate>
        <Box mb={4}>
          <Text mb={1} fontWeight="semibold">
            Título *
          </Text>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((p) => ({ ...p, title: undefined }));
            }}
            placeholder="Ex.: Ruby on Rails"
          />
          {errors.title && <Text mt={1} color="red.500">{errors.title}</Text>}
        </Box>

        <Box mb={4}>
          <Text mb={1} fontWeight="semibold">
            Descrição (opcional)
          </Text>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descrição do curso"
            rows={4}
          />
        </Box>

        <Box mb={4}>
          <Text mb={1} fontWeight="semibold">
            Data de término *
          </Text>
          <Input
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setErrors((p) => ({ ...p, endDate: undefined }));
            }}
            placeholder="dd/mm/aaaa"
            inputMode="numeric"
          />
          {errors.endDate && <Text mt={1} color="red.500">{errors.endDate}</Text>}
        </Box>

        <Box mb={2}>
          <Text mb={1} fontWeight="semibold">
            Vídeo (arquivo ou URL) *
          </Text>

          <Input
            type="file"
            multiple
            onChange={onChangeFiles}
          />
        </Box>

        <Box mb={4}>
          <Input
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setErrors((p) => ({ ...p, video: undefined, videoUrl: undefined }));
            }}
            placeholder="https://exemplo.com/video.mp4"
            type="url"
          />
          {(errors.video || errors.videoUrl) && (
            <Text mt={1} color="red.500">
              {errors.video || errors.videoUrl}
            </Text>
          )}
        </Box>

        <Button
          type="submit"
          colorScheme="blue"
          loading={submitting}
          loadingText="Enviando..."
        >
          Criar
        </Button>

        {feedback && (
          <Text mt={4} color={feedback.kind === "ok" ? "green.500" : "red.500"}>
            {feedback.msg}
          </Text>
        )}
      </form>
    </Box>
  );
}

export { CreateCourse }
