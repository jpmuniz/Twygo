import { Alert } from "@chakra-ui/react";

type DeleteFeed = {
    feedback: "success" | "error" | null
}

export const DeleteFeedback = ({feedback}: DeleteFeed) => {
console.log("DeleteFeed", feedback);
  return (
    <>
      {feedback === "success" && (
        <Alert.Root status="success" mt={4}>
          <Alert.Indicator />
          <Alert.Title>Curso excluído com sucesso!</Alert.Title>
        </Alert.Root>
      )}

      {feedback === "error" && (
        <Alert.Root status="error" mt={4}>
          <Alert.Indicator />
          <Alert.Title>Erro ao excluir curso.</Alert.Title>
        </Alert.Root>
      )}
    </>
  );
};
