import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, useDisclosure, Center } from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import Links from "./links";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center position="fixed" w="12" h="100vh">
        <Center w="100%" h="24" bg="blackAlpha.400" onClick={onOpen}>
          <ArrowForwardIcon w="6" h="6" />
        </Center>
      </Center>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent p="5">
            <DrawerBody>
              <Links />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
