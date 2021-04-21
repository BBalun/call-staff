import { Select, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IGroup } from "../interfaces/group";
import { fetchGroups } from "../utils/fetchGroups";

interface IRequestListOptionsProps {
  setGroupId: (string) => void;
}

export default function RequestListOptions({ setGroupId }: IRequestListOptionsProps) {
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    const groups = await fetchGroups();
    setGroups(groups);
  }

  return (
    <Box bg="twitter.100">
      <Select
        onChange={(event) => {
          setGroupId(event.target.value);
        }}
      >
        <option value="">All groups</option>
        {groups.map((group) => {
          return (
            <option value={group.id} key={group.id}>
              {group.name}
            </option>
          );
        })}
      </Select>
    </Box>
  );
}
