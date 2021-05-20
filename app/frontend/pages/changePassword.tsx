import { Center, Container } from "@chakra-ui/react";
import Layout from "../components/layouts/Layout";
import ChangePasswordForm from "../components/changePassword/ChangePasswordForm";
import LoginRequired from "../components/LoginRequired";

export default function ChangePassword() {
  return (
    <LoginRequired>
      <Layout>
        <Center height="100vh">
          <Container>
            <ChangePasswordForm />
          </Container>
        </Center>
      </Layout>
    </LoginRequired>
  );
}
