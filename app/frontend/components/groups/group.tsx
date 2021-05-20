import { Box, Center, Container, Text, Button, useDisclosure } from "@chakra-ui/react";
import { IGroup } from "../../interfaces/group";
import { deleteGroup } from "../../utils/deleteGroup";
import EditGroupModal from "./EditGroupModal";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";

interface IGroupProps {
  group: IGroup;
  reload: () => void;
}

export default function Group({ group, reload }: IGroupProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function delGroup(groupId: string) {
    const [ok, msg] = await deleteGroup(groupId);
    if (!ok) {
      alert(msg);
      return;
    }
    reload();
  }

  return (
    <>
      <Box
        bg="blackAlpha.100"
        borderRadius="lg"
        p="3"
        d="flex"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <Text>Id: {group.id}</Text> */}
        <Text fontSize="lg" pl="5">
          Name: {group.name}
        </Text>
        <Box d="flex" justifyContent="flex-end">
          <Button colorScheme="blackAlpha" onClick={onOpen} mx="2" leftIcon={<EditIcon />}>
            Edit
          </Button>
          <Button colorScheme="red" onClick={() => delGroup(group.id)} mx="2" leftIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Box>
      </Box>
      <EditGroupModal {...{ isOpen, onClose, reload, group }} />
    </>
  );
}
