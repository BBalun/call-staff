import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import AddDeviceModal from "./addDeviceModal";

export default function AddDeviceButton({ reload }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" leftIcon={<AddIcon />}>
        Add new device
      </Button>

      <AddDeviceModal isOpen={isOpen} onClose={onClose} reload={reload} />
    </>
  );
}
