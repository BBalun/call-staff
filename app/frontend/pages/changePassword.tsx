import { Center, Container } from "@chakra-ui/react";
import Layout from "../components/layouts/layout";
import ChangePasswordForm from "../components/changePassword/changePasswordForm";
import LoginRequired from "../components/loginRequired";

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
