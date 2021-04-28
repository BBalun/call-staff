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
  button3: string;
  button4: string;
  button5: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name of establishment is required"),
  button1: yup.string().trim().default("Order").required(),
  button2: yup.string(),
  button3: yup.string(),
  button4: yup.string(),
  button5: yup.string(),
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

        <FormLabel htmlFor="button3">Button 3 message:</FormLabel>
        <Input type="text" {...register("button3")} placeholder="Enter message for button 3" />

        <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
          {errors.button3 && errors.button3.message}
        </Text>

        <FormLabel htmlFor="button4">Button 4 message:</FormLabel>
        <Input type="text" {...register("button4")} placeholder="Enter message for button 4" />

        <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
          {errors.button4 && errors.button4.message}
        </Text>

        <FormLabel htmlFor="button5">Button 5 message:</FormLabel>
        <Input type="text" {...register("button5")} placeholder="Enter message for button 5" />

        <Text pl="2" color="red" h="1rem" lineHeight="1rem" pt="2">
          {errors.button5 && errors.button5.message}
        </Text>

        <Button type="submit" w="100%">
          Save
        </Button>
      </form>
    </>
  );
}
