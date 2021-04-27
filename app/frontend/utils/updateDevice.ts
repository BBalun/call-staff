import { config } from "../config";
import { putData } from "./putData";

const { SERVER_URL } = config;

interface IUpdateDeviceData {
  macAddress: string;
  name: string;
  groupId?: string;
}

export async function updateDevice(device: IUpdateDeviceData): Promise<[ok: boolean, msg: string | null]> {
  const res = await putData(`${SERVER_URL}/device`, device);
  if (res?.status !== "ok") {
    return [false, res?.msg];
  }
  return [true, null];
}
