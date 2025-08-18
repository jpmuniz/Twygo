
import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogPositioner,
  Portal,
  Button,
  Text,
  type HTMLChakraProps,
} from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColorScheme?: ComponentProps<typeof Button>["colorScheme"];
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
} & Omit<HTMLChakraProps<"div">, "onChange">;

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirmColorScheme = "red",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <DialogRoot open={open} onOpenChange={(e) => !e.open && onCancel()}>
      <Portal>
        <DialogBackdrop bg="blackAlpha.700" zIndex={1400} />
        <DialogPositioner
          zIndex={1401}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <DialogContent
            w={{ base: "92vw", sm: "420px" }}
            maxW="95vw"
            rounded="lg"
            overflow="hidden"
            bg="white"
            _dark={{ bg: "gray.800" }}
            shadow="xl"
          >
            <DialogHeader>
              <Text fontWeight="bold">{title}</Text>
            </DialogHeader>

            <DialogBody>
              {typeof description === "string" ? (
                <Text fontSize="sm">{description}</Text>
              ) : (
                description
              )}
            </DialogBody>

            <DialogFooter gap={3}>
              <Button variant="outline" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button
                colorScheme={confirmColorScheme}
                onClick={onConfirm}
                loading={isLoading}
              >
                {confirmLabel}
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
}
