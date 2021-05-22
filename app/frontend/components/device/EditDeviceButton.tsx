import { Button, useDisclosure } from "@chakra-ui/react";
import EditDeviceModal from "./EditDeviceModal";
import { EditIcon } from "@chakra-ui/icons";

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
      <Button onClick={onOpen} leftIcon={<EditIcon />} colorScheme="blackAlpha">
        Edit
      </Button>

      <EditDeviceModal {...{ isOpen, onClose, reload, device: { name, macAddress, groupId } }} />
    </>
  );
}
