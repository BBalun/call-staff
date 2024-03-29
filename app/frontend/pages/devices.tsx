import { useEffect, useState } from "react";
import { IDevice } from "../interfaces/device";
import { getDevices } from "../utils/getDevice";
import DeviceList from "../components/device/DeviceList";
import { Container, Box } from "@chakra-ui/react";
import Layout from "../components/layouts/Layout";
import AddDeviceButton from "../components/device/AddDeviceButton";
import LoginRequired from "../components/LoginRequired";

export default function Devices() {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadFlag, setReloadFlag] = useState({});

  function reload() {
    setReloadFlag({});
    setLoading(true);
  }

  async function onLoad() {
    const [ok, devices, msg] = await getDevices();
    if (!ok) {
      alert(msg);
      return;
    }
    setDevices(devices);
    setLoading(false);
  }

  useEffect(() => {
    onLoad();
  }, [reloadFlag]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <LoginRequired>
      <Layout>
        <Container h="100vh" py="12">
          <DeviceList devices={devices} reload={reload} />
          <Box d="flex" justifyContent="flex-end">
            <AddDeviceButton reload={reload} />
          </Box>
        </Container>
      </Layout>
    </LoginRequired>
  );
}
