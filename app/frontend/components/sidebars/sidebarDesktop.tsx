import { useDisclosure, Box, Slide } from "@chakra-ui/react";

import Links from "../links";

export default function SidebarDesktop() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          display={{ base: "none", md: "initial" }}
          w="56"
          pl="16"
          h="100vh"
          bg="blackAlpha.50"
          pt="20"
          alignContent="center"
          as="nav"
          position="absolute"
          top="0"
          left="0"
        >
          <Links />
        </Box>
      </Slide>
    </>
  );
}
