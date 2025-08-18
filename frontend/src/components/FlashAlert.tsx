import { Alert, Portal, IconButton, Box } from "@chakra-ui/react";
import { useEffect } from "react";

type Status = "success" | "error" | "warning" | "info";
type Position =
  | "top-left" | "top" | "top-right"
  | "bottom-left" | "bottom" | "bottom-right";

export type FlashAlertProps = {
  open: boolean;
  status: Status;
  title: string;
  description?: string;
  duration?: number; 
  onOpenChange: (open: boolean) => void;
  position?: Position; 
};

const FlashAlert = ({
  open,
  status,
  title,
  description,
  duration = 3000,
  onOpenChange,
  position = "top-right",
}: FlashAlertProps) => {
  useEffect(() => {
    if (!open || !duration) return;
    const t = setTimeout(() => onOpenChange(false), duration);
    return () => clearTimeout(t);
  }, [open, duration, onOpenChange]);

  if (!open) return null;

  const pos: React.CSSProperties = {
    position: "fixed",
    zIndex: 1600,
    margin: 16,
    ...(position.includes("top") ? { top: 0 } : { bottom: 0 }),
    ...(position.includes("left") ? { left: 0 } : {}),
    ...(position.includes("right") ? { right: 0 } : {}),
    ...(position === "top" ? { left: 0, right: 0, margin: "16px auto", width: "fit-content" } : {}),
    ...(position === "bottom" ? { left: 0, right: 0, margin: "16px auto", width: "fit-content" } : {}),
  };

  return (
    <Portal>
      <Box style={pos}>
        <Alert.Root status={status} variant="surface" w={{ base: "92vw", sm: "420px" }} rounded="md" shadow="lg">
          <Alert.Indicator />
          <Box flex="1" minW={0}>
            <Alert.Title noOfLines={1}>{title}</Alert.Title>
            {description && <Alert.Description noOfLines={3}>{description}</Alert.Description>}
          </Box>
          <IconButton aria-label="Fechar" variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            ✕
          </IconButton>
        </Alert.Root>
      </Box>
    </Portal>
  );
}


export { FlashAlert }