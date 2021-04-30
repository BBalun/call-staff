import { IDevice } from "../../interfaces/device";
import { Text, Box, Button } from "@chakra-ui/react";
import { deleteDevice } from "../../utils/deleteDevice";
import EditDeviceButton from "./editDeviceButton";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

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
      <Box
        bg="blackAlpha.100"
        borderRadius="lg"
        p="3"
        d="flex"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Text>Mac address: {props.macAddress}</Text>
          <Text>Name: {props.name}</Text>
          <Text>Battery level: {props.battery ?? "?"}%</Text>
          <Text>Group: {props.group?.name ?? "No group"}</Text>
        </Box>
        <Box d="flex" justifyContent="flex-end">
          <Button mx="1" onClick={delDevice} leftIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Box mx="1">
            <EditDeviceButton {...props} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
