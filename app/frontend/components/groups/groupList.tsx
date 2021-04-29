import { Box, Center, Container, Text, Button, useDisclosure } from "@chakra-ui/react";
import { IGroup } from "../../interfaces/group";
import Group from "./group";

interface IGroupList {
  loading: boolean;
  groups: IGroup[];
  reload: () => void;
}

export default function GroupList({ loading, groups, reload }: IGroupList) {
  if (loading) {
    return <Center>Loading ...</Center>;
  }

  return (
    <>
      {groups.map((group) => (
        <Box my="5" key={group.id}>
          <Group {...{ group, reload }} key={group.id}></Group>
        </Box>
      ))}
    </>
  );
}
