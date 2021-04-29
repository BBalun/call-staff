import { IRequest } from "../../interfaces/request";
import { Button, Box } from "@chakra-ui/react";
import { finisheRequest } from "../../utils/finishRequest";

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
    <Box bg="blackAlpha.100">
      {/* <p>name: {props.device.name}</p> */}
      {/* <p>id: {props.id}</p> */}
      {/* <p>button: {props.button}</p> */}
      <p>{deviceName}</p>
      <p>name: {buttonName}</p>
      <p>{Math.floor(new Date().getTime() / (1000 * 60) - new Date(time).getTime() / (1000 * 60))} minutes ago</p>
      <Button onClick={finish} bg="teal.100">
        Finish
      </Button>
    </Box>
  );
}
