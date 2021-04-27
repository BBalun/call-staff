import { config } from "../config";
import { postData } from "./postData";

const { SERVER_URL } = config;

export async function createDevice(device: {
  macAddress: string;
  name: string;
  groupId?: string;
}): Promise<[ok: boolean, msg: string | null]> {
  if (!device.groupId) {
    device.groupId = null;
  }
  const res = await postData(`${SERVER_URL}/device`, device);
  if (res?.status !== "ok") {
    return [false, res?.msg];
  }
  return [true, null];
}
