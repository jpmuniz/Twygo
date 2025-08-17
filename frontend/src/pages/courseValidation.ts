
export type CreateCourseFormValues = {
  title: string;
  description?: string;
  endDateBr: string;       
  videoUrl?: string;       
  videoFiles?: FileList | null; 
};

export type CreateCourseFormErrors = {
  title?: string;
  endDate?: string;
  video?: string;
  videoUrl?: string;
};

const isValidDate = (br: string): string | null => {
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

  const sameDay   = d.getUTCDate() === dd;
  const sameMonth = d.getUTCMonth() + 1 === mm;
  const sameYear  = d.getUTCFullYear() === yyyy;
  return sameDay && sameMonth && sameYear ? iso : null;
}

export const isValidHttpUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export type ValidateResult =
  | {
      ok: true;
      errors: {};
      payload: {                
        title: string;
        description?: string;
        end_date: string;       
      };
      videoSource:
        | { kind: "files"; files: FileList }
        | { kind: "url"; url: string }
        | { kind: "none" };
    }
  | {
      ok: false;
      errors: CreateCourseFormErrors;
    };


const validateCreateCourse = (values: CreateCourseFormValues): ValidateResult  => {
  const errors: CreateCourseFormErrors = {};
  const title = values.title?.trim() ?? "";
  const description = values.description?.trim() || undefined;
  const endDateBr = values.endDateBr?.trim() ?? "";
  const url = values.videoUrl?.trim() ?? "";
  const files = values.videoFiles;

  if (!title) errors.title = "Título é obrigatório.";

  if (!endDateBr) {
    errors.endDate = "Data de término é obrigatória.";
  } else {
    const iso = isValidDate(endDateBr);
    if (!iso) errors.endDate = "Data inválida. Use dd/mm/aaaa (ex.: 31/12/2025).";
  }

  const hasFiles = !!(files && files.length > 0);
  const hasUrl = !!url;
  if (!hasFiles && !hasUrl) {
    errors.video = "Envie ao menos um vídeo (arquivo ou URL).";
  }
  if (hasUrl && !isValidHttpUrl(url)) {
    errors.videoUrl = "Informe uma URL válida (http/https).";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const end_date = isValidDate(endDateBr)!;

  let videoSource: ValidateResult extends { ok: true } ? any : never;
  if (hasFiles) {
    videoSource = { kind: "files", files: files! };
  } else if (hasUrl) {
    videoSource = { kind: "url", url };
  } else {
    videoSource = { kind: "none" };
  }

  return {
    ok: true,
    errors: {},
    payload: { title, description, end_date },
    videoSource,
  };
}

export { validateCreateCourse }
