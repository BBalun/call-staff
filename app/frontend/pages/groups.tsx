import GroupList from "../components/groups/groupList";
import Layout from "../components/layouts/layout";
import AddGroupButton from "../components/groups/addGroupButton";
import { Container, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { getGroups } from "../utils/getGroups";
import { IGroup } from "../interfaces/group";

export default function Groups() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [reloadFlag, setReloadFlag] = useState({});

  function reload() {
    setReloadFlag({});
    setLoading(true);
  }

  async function onLoad() {
    const [ok, groups, msg] = await getGroups();
    if (!ok) {
      alert(msg);
      return;
    }
    setGroups(groups.sort((a, b) => (a.name < b.name ? -1 : 1)));
    setLoading(false);
  }

  useEffect(() => {
    onLoad();
  }, [reloadFlag]);

  return (
    <Layout>
      <Container pt="16" maxW={{ sm: "100%", md: "75%", lg: "container.sm", xl: "container.md" }}>
        <Box mb="5" w="100%">
          <GroupList loading={loading} groups={groups} reload={reload} />
        </Box>
        <AddGroupButton reload={reload} />
      </Container>
    </Layout>
  );
}
