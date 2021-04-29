import { IDevice } from "../../interfaces/device";
import { Text, Box, Button } from "@chakra-ui/react";
import { deleteDevice } from "../../utils/deleteDevice";
import EditDeviceButton from "./editDeviceButton";

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
        <Text>Battery level: {props.battery ?? "?"}%</Text>
        <Text>Group: {props.group?.name ?? "No group"}</Text>
        <Button onClick={delDevice}>Delete</Button>
        <EditDeviceButton {...props} />
      </Box>
    </>
  );
}
