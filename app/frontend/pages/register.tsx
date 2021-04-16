import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel, Input, Button, Center, Heading, Text, Box, Divider } from "@chakra-ui/react";
import Link from "next/link";

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

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <Center height="100vh">
      <Box p="7" w="sm" borderWidth="thin" borderRadius="12" bg="white" borderColor="gray.100" boxShadow="xl">
        <Heading pb="1" textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input type="text" {...register("email")} />
          <Text pl="2">{errors.email?.message}</Text>

          <FormLabel htmlFor="username">Username:</FormLabel>
          <Input type="text" {...register("username")} />
          <Text pl="2">{errors.username?.message}</Text>

          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input type="password" {...register("password")} />
          <Text pl="2">{errors.password?.message}</Text>

          <FormLabel htmlFor="establishmentName">Establishment name:</FormLabel>
          <Input type="text" {...register("establishmentName")} />
          <Text pl="2">{errors.establishmentName?.message}</Text>

          <Button type="submit" width="100%" marginTop="2">
            Register
          </Button>
          <Divider size="2px" my="2" />
          <Text textAlign="center">
            Already have an account? Log in <Link href="/login">here!</Link>
          </Text>
        </form>
      </Box>
    </Center>
  );
}

export default Register;
