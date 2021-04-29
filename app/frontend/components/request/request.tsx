import { IRequest } from "../../interfaces/request";
import { Button, Box } from "@chakra-ui/react";
import { finisheRequest } from "../../utils/finishRequest";

interface IRequestProps extends IRequest {}

export default function Request(props: IRequestProps) {
  async function finish() {
    const [ok, msg] = await finisheRequest(props.id);
    if (!ok) {
      alert(msg); // TODO
    }
  }

  return (
    <Box bg="blackAlpha.100">
      <p>id: {props.id}</p>
      <p>button: {props.button}</p>
      <p>time: {props.time}</p>
      <Button onClick={finish} bg="teal.100">
        Finish
      </Button>
    </Box>
  );
}
