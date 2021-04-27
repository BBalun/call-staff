import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { updateGroup } from "../../utils/updateGroup";
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

export default function EditGroupModal({ isOpen, onClose, reload, group }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(groupInfo: IFormInput) {
    const msg = await updateGroup({ id: group.id, name: groupInfo.name });
    if (msg) {
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
          <ModalHeader>Edit group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input type="text" {...register("name")} placeholder="Enter new name" />

            <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
              {errors.name && errors.name.message}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
