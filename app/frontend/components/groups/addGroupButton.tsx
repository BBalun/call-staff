import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import AddGroupModal from "./addGroupModal";

export default function AddGroupButton({ reload }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} bg="teal.100">
        Add new group
      </Button>
      <AddGroupModal isOpen={isOpen} onClose={onClose} reload={reload} />
    </>
  );
}
