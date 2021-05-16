import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel, Input, Button, Center, Heading, Text, Box, Divider } from "@chakra-ui/react";
import { changePassword } from "../../utils/changePassword";

interface IFormInput {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  newPassword: yup.string().required("New Password is required"),
  newPasswordConfirm: yup.string().required("Confirm password is required"),
});

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: IFormInput) {
    // ...
    const [ok, msg] = await changePassword(data.password, data.newPassword, data.newPasswordConfirm);
    if (!ok) {
      alert(msg);
    } else {
      alert("Password changed succesfully");
    }
    reset(null);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="email">Current password:</FormLabel>
        <Input type="password" {...register("password")} placeholder="Enter your current password" />
        <Text pl="2" color="red.100">
          {errors.password?.message}
        </Text>

        <FormLabel htmlFor="email">New password:</FormLabel>
        <Input type="password" {...register("newPassword")} placeholder="Enter new password" />
        <Text pl="2" color="red.100">
          {errors.newPassword?.message}
        </Text>

        <FormLabel htmlFor="email">Confirm password:</FormLabel>
        <Input type="password" {...register("newPasswordConfirm")} placeholder="Confirm new password" />
        <Text pl="2" color="red.100">
          {errors.newPasswordConfirm?.message}
        </Text>

        <Button type="submit" mt="2" float="right">
          Submit
        </Button>
      </form>
    </>
  );
}
