import { useState, type ChangeEvent } from "react";
import { Box, Input, Textarea, Button, Text } from "@chakra-ui/react";
import {
  createCourse as createCourseApi,
  uploadVideoByUrl,
  uploadVideoFiles,
} from "../api/service";

function brToIso(br: string): string | null {
  const trimmed = br.trim();
  const m = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;

  const [, ddStr, mmStr, yyyyStr] = m;
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  const yyyy = Number(yyyyStr);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

  const iso = `${yyyyStr}-${mmStr}-${ddStr}`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;

  const sameDay = d.getUTCDate() === dd;
  const sameMonth = d.getUTCMonth() + 1 === mm;
  const sameYear = d.getUTCFullYear() === yyyy;
  return sameDay && sameMonth && sameYear ? iso : null;
}

function isValidHttpUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

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

  function validate(): boolean {
    const e: Errors = {};

    if (!title.trim()) e.title = "Título é obrigatório.";

    if (!endDate.trim()) e.endDate = "Data de término é obrigatória.";
    else if (!brToIso(endDate)) e.endDate = "Data inválida. Use dd/mm/aaaa (ex.: 31/12/2025).";

    const hasFiles = !!(videoFiles && videoFiles.length > 0);
    const hasUrl = !!videoUrl.trim();

    if (!hasFiles && !hasUrl) {
      e.video = "Envie ao menos um vídeo (arquivo ou URL).";
    }

    if (hasUrl && !isValidHttpUrl(videoUrl.trim())) {
      e.videoUrl = "Informe uma URL válida (http/https).";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function createCourse(payload: {
    title: string;
    description?: string;
    end_date: string;
  }) {
    const res = await createCourseApi(payload);
    console.log(res)
    if (!res.created_at) {
      let msg = "Falha ao criar curso";
      try {
        const j = await res.json();
        if (j?.errors) msg = Array.isArray(j.errors) ? j.errors.join(", ") : String(j.errors);
        else if (j?.error) msg = j.error;
      } catch {}
      throw new Error(msg);
    }
    return res; 
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    if (!validate()) return;

    const end_date_iso = brToIso(endDate)!;
    setSubmitting(true);
    try {
      const created = await createCourse({
        title: title.trim(),
        description: description.trim() || undefined,
        end_date: end_date_iso,
      });

      const id: number | undefined = created?.id;
      if (!id) throw new Error("Curso criado mas ID não retornado pela API.");

      if (videoFiles && videoFiles.length > 0) {
        await uploadVideoFiles(id, videoFiles);
      }

      if (videoUrl.trim()) {
        await uploadVideoByUrl(id, videoUrl.trim());
      }

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

  function onChangeFiles(ev: ChangeEvent<HTMLInputElement>) {
    setVideoFiles(ev.currentTarget.files);
    setErrors((p) => ({ ...p, video: undefined }));
  }

  return (
    <Box maxW="680px" mx="auto" p={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Criar curso
      </Text>

      <form onSubmit={onSubmit} noValidate>
        {/* Título */}
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
