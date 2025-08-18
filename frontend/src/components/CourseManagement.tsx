import { useEffect, useState, type ChangeEvent } from "react";
import { Box, Input, Textarea, Button, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateCourseWithVideo } from "../hooks/useCreateCourseWithVideo";
import { useEditCourse } from "../hooks/useEditCourse";
import { validateCreateCourse } from "./courseValidation";
import { validateEditCourse } from "./courseValidationEdit";
import { brToIso, isoToBr, formatDate } from "../utils/dateFormat";

type Errors = {
  title?: string;
  endDate?: string;
  video?: string;
  videoUrl?: string;
};

const CourseManagement = () => {
  const navigate = useNavigate();
  const location = useLocation() as {
    state?: {
      editing?: boolean;
      initial?: {
        id: number | string;
        title: string;
        description?: string;
        endDate: string; 
        url?: string;
      };
    };
  };  

  const isEdit = location.state?.editing === true;
  const initial = location.state?.initial;
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [endDate, setEndDate] = useState(
    initial?.endDate ? isoToBr(initial.endDate) : ""
  );
  const [videoFiles, setVideoFiles] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const { run: runCreate } = useCreateCourseWithVideo();
  const { mutate: runEdit } = useEditCourse();

 useEffect(() => {
   const init = location.state?.initial;
   if (!init) return;
   setTitle(init.title);
   setDescription(init.description ?? "");
   setEndDate(isoToBr(init.endDate));
}, [location.state]);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const basePayload = {
      title,
      description,
      endDateBr: endDate,
      videoFiles,
    };

    const result = isEdit
      ? validateEditCourse(basePayload)
      : validateCreateCourse(basePayload);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setSubmitting(true);
    try {
      if (!isEdit) {
        await runCreate({
          course: {
            title: title.trim(),
            description: description.trim() || undefined,
            end_date: brToIso(endDate)!,
            videoFiles,
          },
        });

        setFeedback({ kind: "ok", msg: "Curso criado e vídeo anexado com sucesso!" });
        setTitle("");
        setDescription("");
        setEndDate("");
        setVideoFiles(null);
        setErrors({});
        navigate("/videos", { replace: true });
      }  
      if(isEdit) {
        runEdit(
          {
            courseId: initial!.id,
            course: {
              title: title.trim(),
              description: description.trim() || undefined,
              end_date: brToIso(endDate)!,
            },
            videoFiles
          },
          {
            onSuccess: () => {
              setFeedback({ kind: "ok", msg: "Curso atualizado com sucesso!" });
              setVideoFiles(null);
              navigate("/videos", { replace: true });
            },
            onError: (err: any) => {
              setFeedback({ kind: "err", msg: String(err?.message || err) });
            },
            onSettled: () => setSubmitting(false),
          }
        );
        return; 
      }
    } catch (err: any) {
      setFeedback({ kind: "err", msg: String(err?.message || err) });
    } finally {
      if (!isEdit) setSubmitting(false);
    }
  };

  const onChangeFiles = (ev: ChangeEvent<HTMLInputElement>) => {
    setVideoFiles(ev.currentTarget.files);
    setErrors((p) => ({ ...p, video: undefined }));
  };

  return (
    <Box maxW="680px" mx="auto" p={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {isEdit ? "Editar curso" : "Criar curso"}
      </Text>

      <form onSubmit={onSubmit} noValidate>
        <Box mb={4}>
          <Text mb={1} fontWeight="semibold">Título *</Text>
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
          <Text mb={1} fontWeight="semibold">Descrição (opcional)</Text>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descrição do curso"
            rows={4}
          />
        </Box>

        <Box mb={4}>
          <Text mb={1} fontWeight="semibold">Data de término *</Text>
          <Input
            value={endDate}
            onChange={(e) => {
              setEndDate(formatDate(e));
              setErrors((p) => ({ ...p, endDate: undefined }));
            }}
            placeholder="dd/mm/aaaa"
            inputMode="numeric"
          />
          {errors.endDate && <Text mt={1} color="red.500">{errors.endDate}</Text>}
        </Box>

        <Box mb={2}>
          <Text mb={1} fontWeight="semibold">Vídeo (arquivo ou URL) {isEdit ? "(opcional)" : "*"}</Text>
          <Input type="file" multiple onChange={onChangeFiles} />
        </Box>

        <Box mb={4}>
          {(errors.video) && (
            <Text mt={1} color="red.500">{errors.video}</Text>
          )}
        </Box>

        <Button
          type="submit"
          colorScheme="blue"
          loading={submitting}
          loadingText={isEdit ? "Salvando..." : "Enviando..."}
        >
          {isEdit ? "Salvar alterações" : "Criar"}
        </Button>

        {feedback && (
          <Text mt={4} color={feedback.kind === "ok" ? "green.500" : "red.500"}>
            {feedback.msg}
          </Text>
        )}
      </form>
    </Box>
  );
};

export { CourseManagement };
