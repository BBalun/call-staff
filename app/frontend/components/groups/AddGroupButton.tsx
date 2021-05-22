import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import AddGroupModal from "./AddGroupModal";
import { AddIcon } from "@chakra-ui/icons";

export default function AddGroupButton({ reload }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" float="right" leftIcon={<AddIcon />} size="lg">
        Add new group
      </Button>
      <AddGroupModal isOpen={isOpen} onClose={onClose} reload={reload} />
    </>
  );
}
