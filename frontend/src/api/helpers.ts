export const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.errors?.join(", ") || data?.error || "Erro desconhecido");
  }
  return data;
};
