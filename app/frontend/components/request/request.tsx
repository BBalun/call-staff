import { Button, Box } from "@chakra-ui/react";
import { finisheRequest } from "../../utils/finishRequest";
import { Text } from "@chakra-ui/react";

interface IRequestProps {
  id: string;
  time: string;
  buttonName: string;
  deviceName: string;
}

export default function Request({ id, time, buttonName, deviceName }: IRequestProps) {
  async function finish() {
    const [ok, msg] = await finisheRequest(id);
    if (!ok) {
      alert(msg); // TODO
    }
  }

  return (
    <Box p="3" bg="blackAlpha.100">
      <Text>{deviceName}</Text>
      <Text>{buttonName}</Text>
      <Text>{Math.floor(new Date().getTime() / (1000 * 60) - new Date(time).getTime() / (1000 * 60))} minutes ago</Text>
      <Button colorScheme="black" onClick={finish} mt="2" variant="outline">
        Finish
      </Button>
    </Box>
  );
}
