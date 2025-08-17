import { Box, Flex, HStack, Link as CLink, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const linkProps = {
  px: 3,
  py: 2,
  rounded: "md",
  _hover: { bg: "whiteAlpha.200" },
  _activeLink: { bg: "white", color: "gray.900" },
};

const NavMenu = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex={1000}
      bg="purple"
      color="white"
      px={{ base: 4, md: 8 }}
      py={3}
      boxShadow="sm"
    >
      <Flex
        align="center"
        justify="space-between"
        gap={4}
        direction={{ base: "column", md: "row" }}
      >
        <Text fontWeight="bold" fontSize="lg">Twygo</Text>

        <HStack spacing={{ base: 2, md: 4 }} wrap="wrap" justify={{ base: "center", md: "flex-end" }}>
          <CLink as={NavLink} to="/create" color="white" {...linkProps}>
            Criar curso
          </CLink>
          <CLink as={NavLink} to="/videos" color="white" {...linkProps}>
            Página de vídeos
          </CLink>
          <CLink as={NavLink} to="/reports" color="white" {...linkProps}>
            Relatório de vídeos
          </CLink>
        </HStack>
      </Flex>
    </Box>
  );
}

export { NavMenu }
