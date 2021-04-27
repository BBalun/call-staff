import { config } from "../config";
import { deleteData } from "./deleteData";

const { SERVER_URL } = config;

export async function deleteDevice(macAddress: string): Promise<[ok: boolean, msg: string | null]> {
  const res = await deleteData(`${SERVER_URL}/device/${macAddress}`);
  if (res?.status !== "ok") {
    return [false, res?.msg];
  }
  return [true, null];
}
