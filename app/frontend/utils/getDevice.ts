import { config } from "../config";
import { IDevice } from "../interfaces/device";

const { SERVER_URL } = config;

export async function getDevices(): Promise<[ok: boolean, data: IDevice[], msg: string]> {
  const temp = await fetch(`${SERVER_URL}/devices`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}
