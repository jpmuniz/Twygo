import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Portal,
  Button,
  Text,
} from "@chakra-ui/react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColorScheme?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirmColorScheme = "red",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <DialogRoot open={open} onOpenChange={(e) => !e.open && onCancel()}>
      <Portal>
        <DialogBackdrop bg="blackAlpha.700" />
        <DialogContent
          w={{ base: "92vw", sm: "420px" }}
          maxW="95vw"
          rounded="lg"
          overflow="hidden"
          bg="white"
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
      </Portal>
    </DialogRoot>
  );
}

export { ConfirmDialog }
