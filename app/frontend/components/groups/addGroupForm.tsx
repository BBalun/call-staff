import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel, Input, Button, Center, Heading, Text, Box, Divider } from "@chakra-ui/react";

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

async function onSubmit(userInfo: IFormInput) {
  // ...
  alert("onSubmit");
}

export default function AddGroupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="email">Name:</FormLabel>
        <Input type="text" {...register("name")} placeholder="Enter name of the new group" />
        {errors.name && (
          <Text pl="2" color="red.100">
            {errors.name.message}
          </Text>
        )}
      </form>
    </>
  );
}
