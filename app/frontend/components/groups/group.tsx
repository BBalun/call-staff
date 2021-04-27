import { Box, Center, Container, Text, Button, useDisclosure } from "@chakra-ui/react";
import { IGroup } from "../../interfaces/group";
import { deleteGroup } from "../../utils/deleteGroup";
import EditGroupModal from "./editGroupModal";

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
      <Box bg="teal.100" key={group.id}>
        <Text>Id: {group.id}</Text>
        <Text>Name: {group.name}</Text>
        <Button onClick={onOpen}>Edit</Button>
        <Button onClick={() => delGroup(group.id)}>Delete</Button>
      </Box>
      <EditGroupModal {...{ isOpen, onClose, reload, group }} />
    </>
  );
}
