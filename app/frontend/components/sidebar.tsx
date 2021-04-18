import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import Links from "./links";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const iconSize = 10;
  const offset = 4;
  const size = `${iconSize + offset} rem`;

  return (
    <>
      <Box
        position="absolute"
        w={{ base: "100vw", sm: "auto" }}
        h={{ base: "auto", sm: "100vh" }}
        bg="blackAlpha.200"
        textAlign={{ base: "right", sm: "center" }}
        // pt={{ base: "0", sm: "5" }}
        p={offset}
        lineHeight={size}
      >
        <HamburgerIcon onClick={onOpen} w={iconSize} h={iconSize} />
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent p="5">
            {/* <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader> */}
            <DrawerBody>
              <Links />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
