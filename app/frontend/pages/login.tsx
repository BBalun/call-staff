import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel, Input, Button, Center, Heading, Text, Box, Divider } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginUser } from "../auth/auth";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Wrong format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  async function onSubmit(userInfo: IFormInput) {
    const [res, msg] = await loginUser(userInfo);
    if (res) {
      router.push("/home");
      return;
    }
    alert(msg); // TODO
  }

  return (
    <Center height="100vh" bg="blackAlpha.100">
      <Box p="7" w="sm" borderWidth="thin" borderRadius="12" bg="white" borderColor="gray.100" boxShadow="xl">
        <Heading pb="1" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input type="text" {...register("email")} />
          {errors.email && <Text pl="2">{errors.email.message}</Text>}

          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input type="password" {...register("password")} />
          {errors.password && <Text pl="2">{errors.password.message}</Text>}

          <Button type="submit" width="100%" marginTop="2">
            Login
          </Button>
        </form>
        <Divider my="2" />
        <Text textAlign="center">
          Not registered yet? Create your account <Link href="/register">here!</Link>
        </Text>
      </Box>
    </Center>
  );
}

export default Login;
