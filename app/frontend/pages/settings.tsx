import { Container } from "@chakra-ui/react";
import Layout from "../components/layouts/layout";
import SettingsForm from "../components/settings/settingsForm";

export default function Settings() {
  return (
    <Layout>
      <Container h="100vh" py="16">
        <SettingsForm />
      </Container>
    </Layout>
  );
}
