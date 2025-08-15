import {
  Box,
  Tooltip, 
} from "@chakra-ui/react";

export const TruncatedWithTooltip = ({
  label,
  enabled,
  children,
}: {
  label: string;
  enabled: boolean;
  children: React.ReactNode;
}) =>{
  if (!enabled) return <>{children}</>;

  return (
    <Tooltip.Root openDelay={350}>
      <Tooltip.Trigger asChild>
        <Box display="inline-block">{children}</Box>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content px={2} py={1} rounded="md" bg="gray.800" color="white" fontSize="xs">
          {label}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
}