import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../components/layouts/layout";
import SettingsForm from "../components/settings/settingsForm";
import { IEstablishmentSettings } from "../interfaces/establishmentSettings";
import { getSettings } from "../utils/getSettings";

export default function Settings() {
  const [settings, setSettings] = useState<IEstablishmentSettings>(null);
  const [loading, setloading] = useState(true);

  async function onLoad() {
    const [ok, settings, msg] = await getSettings();
    if (!ok) {
      alert(msg);
      return;
    }
    setSettings(settings);
    setloading(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div>Loading ...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container h="100vh" py="16">
        <SettingsForm settings={settings} />
      </Container>
    </Layout>
  );
}
