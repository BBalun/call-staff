import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import createGroup from "../../utils/createGroup";

interface IFormInput {
  name: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(3, "Name of the group has to be at least 3 characters long"),
});

interface IAddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  reload: () => void;
}

export default function AddGroupModal({ isOpen, onClose, reload }: IAddGroupModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(groupInfo: IFormInput) {
    const [ok, msg] = await createGroup(groupInfo.name);
    if (!ok) {
      alert(msg);
      return;
    }
    onClose();
    reload();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input type="text" {...register("name")} placeholder="Enter name of the new group" />

            <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
              {errors.name && errors.name.message}
            </Text>
          </ModalBody>

          <ModalFooter pt="1">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" ml={3} type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
