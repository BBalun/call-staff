import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel, Input, Button, Center, Heading, Text, Box, Divider } from "@chakra-ui/react";
import Link from "next/link";
import { createUser } from "../../utils/createUser";

interface IRegisterInput {
  username: string;
  email: string;
  password: string;
  establishmentName: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Wrong format").required("Email is required"),
  password: yup.string().required("Password is required").min(5, "Password has to be at leas 5 characters long"),
  establishmentName: yup.string().required("Establishment name is required"),
});

export default function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterInput>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: IRegisterInput) {
    const [ok, msg] = await createUser(data);
    if (!ok) {
      alert(msg);
      return;
    }
    alert("user created"); // TODO
    reset();
  }

  return (
    <Center height="100vh">
      <Box p="7" w="sm">
        <Heading pb="5" textAlign="left">
          Create new user
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input type="text" {...register("email")} />
          <Text pl="2" color="red">
            {errors.email?.message}
          </Text>

          <FormLabel htmlFor="username">Username:</FormLabel>
          <Input type="text" {...register("username")} />
          <Text pl="2" color="red">
            {errors.username?.message}
          </Text>

          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input type="password" {...register("password")} />
          <Text pl="2" color="red">
            {errors.password?.message}
          </Text>

          <FormLabel htmlFor="establishmentName">Establishment name:</FormLabel>
          <Input type="text" {...register("establishmentName")} />
          <Text pl="2" color="red">
            {errors.establishmentName?.message}
          </Text>

          <Button type="submit" width="100%" marginTop="2">
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
}
