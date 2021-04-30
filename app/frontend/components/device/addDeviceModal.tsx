import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IGroup } from "../../interfaces/group";
import { useEffect, useState } from "react";
import { getGroups } from "../../utils/getGroups";
import { createDevice } from "../../utils/createDevice";

interface IFormInput {
  name: string;
  macAddress: string;
  groupId: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(3, "Name of the group has to be at least 3 characters long"),
  macAddress: yup.string().required("Mac address is required").length(17, "Invalid length"),
  groupId: yup.string(),
});

export default function AddDeviceModal({ isOpen, onClose, reload }) {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(true);

  async function onLoad() {
    const [ok, data, msg] = await getGroups();
    if (!ok) {
      alert(msg);
      return;
    }
    setGroups(data);
    setLoading(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  async function onSubmit({ macAddress, name, groupId }: IFormInput) {
    let [ok, msg] = [false, null];
    macAddress = macAddress.toLowerCase();
    if (groupId !== "none") {
      [ok, msg] = await createDevice({ macAddress, name, groupId });
    } else {
      [ok, msg] = await createDevice({ macAddress, name });
    }
    if (!ok) {
      alert(msg); // TODO
      return;
    }
    onClose();
    reload();
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new device</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input type="text" {...register("name")} placeholder="Enter name of the new device" />

            <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
              {errors.name && errors.name.message}
            </Text>

            <FormLabel htmlFor="macAddress">MAC address:</FormLabel>
            <Input type="text" {...register("macAddress")} placeholder="Enter MAC address" />

            <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
              {errors.macAddress && errors.macAddress.message}
            </Text>

            <FormLabel htmlFor="groupId">Group:</FormLabel>
            <Select {...register("groupId")}>
              <option value="none">None</option>
              {groups.map((group) => {
                return (
                  <option value={group.id} key={group.id}>
                    {group.name}
                  </option>
                );
              })}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="ghost">
              Close
            </Button>
            <Button colorScheme="blue" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
