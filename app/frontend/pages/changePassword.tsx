import { Center, Container } from "@chakra-ui/react";
import Layout from "../components/layouts/layout";
import ChangePasswordForm from "../components/changePassword/changePasswordForm";

export default function changePassword() {
  return (
    <Layout>
      <Center height="100vh">
        <Container>
          <ChangePasswordForm />
        </Container>
      </Center>
    </Layout>
  );
}
