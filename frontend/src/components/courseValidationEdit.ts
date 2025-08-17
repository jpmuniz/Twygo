
const validateEditCourse = (input: {
  title: string;
  endDateBr: string;
  videoUrl?: string;
  videoFiles?: FileList | null;
}) => {
  const errors: { title?: string; endDate?: string; videoUrl?: string } = {};

  if (!input.title.trim()) errors.title = "Informe um título";
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(input.endDateBr.trim()))
    errors.endDate = "Data inválida (use dd/mm/aaaa)";

  if (input.videoUrl && input.videoUrl.trim() && !/^https?:\/\//.test(input.videoUrl))
    errors.videoUrl = "URL inválida";

  return { success: Object.keys(errors).length === 0, errors };
}

export { validateEditCourse }