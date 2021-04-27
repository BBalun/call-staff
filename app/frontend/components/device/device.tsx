import { IDevice } from "../../interfaces/device";
import { Text, Box, Button } from "@chakra-ui/react";
import { deleteDevice } from "../../utils/deleteDevice";

interface IDeviceProps extends IDevice {
  reload: () => void;
}

export default function Device(props: IDeviceProps) {
  async function delDevice() {
    const [ok, msg] = await deleteDevice(props.macAddress);
    if (!ok) {
      alert(msg);
      return;
    }
    props.reload();
  }

  return (
    <>
      <Box>
        <Text>Mac address: {props.macAddress}</Text>
        <Text>Name: {props.name}</Text>
        <Text>Battery level: {props.battery ?? "___"}%</Text>
        <Text>Group: {props.groupId}</Text>
        <Button onClick={delDevice}>Delete</Button>
        <Button>Edit</Button>
      </Box>
    </>
  );
}
