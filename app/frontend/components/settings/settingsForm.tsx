import { IEstablishmentSettings } from "../../interfaces/establishmentSettings";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text, Button, FormLabel, Input } from "@chakra-ui/react";
import { putSettings } from "../../utils/putSettings";
import { useRouter } from "next/router";

interface IFormInput {
  name: string;
  button1: string;
  button2: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name of establishment is required"),
  button1: yup.string().trim().default("Order").required(),
  button2: yup.string(),
});

interface ISettingsFormProps {
  settings: IEstablishmentSettings;
}

export default function SettingsForm({ settings }: ISettingsFormProps) {
  const { id, ...defaultValues } = settings;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  async function onSubmit(data: IFormInput) {
    const [ok, msg] = await putSettings({ id, ...data });
    if (!ok) {
      alert(msg);
      return;
    }
    router.push("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="name">Name:</FormLabel>
        <Input type="text" {...register("name")} placeholder="Enter name of your establishment" />

        <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
          {errors.name && errors.name.message}
        </Text>

        <FormLabel htmlFor="button1">Button 1 message:</FormLabel>
        <Input type="text" {...register("button1")} placeholder="Enter message for button 1" />

        <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
          {errors.button1 && errors.button1.message}
        </Text>

        <FormLabel htmlFor="button2">Button 2 message:</FormLabel>
        <Input type="text" {...register("button2")} placeholder="Enter message for button 2" />

        <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
          {errors.button2 && errors.button2.message}
        </Text>

        <Button type="submit" w="100%">
          Save
        </Button>
      </form>
    </>
  );
}
