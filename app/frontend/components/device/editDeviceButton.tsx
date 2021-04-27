import { Button, useDisclosure } from "@chakra-ui/react";
import EditDeviceModal from "./editDeviceModal";

interface IEditDeviceButtonProps {
  reload: () => void;
  name: string;
  macAddress: string;
  groupId: string;
}

export default function EditDeviceButton({ reload, name, macAddress, groupId }: IEditDeviceButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <EditDeviceModal {...{ isOpen, onClose, reload, device: { name, macAddress, groupId } }} />
    </>
  );
}
