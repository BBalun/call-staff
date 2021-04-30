import { Box } from "@chakra-ui/layout";
import { IDevice } from "../../interfaces/device";
import Device from "./device";

interface IDeviceListProps {
  devices: IDevice[];
  reload: () => void;
}

export default function DeviceList({ devices, reload }: IDeviceListProps) {
  return (
    <>
      {devices.map((device) => (
        <Box my="5" key={device.macAddress}>
          <Device {...device} key={device.macAddress} reload={reload} />
        </Box>
      ))}
    </>
  );
}
