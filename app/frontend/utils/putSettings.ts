import { config } from "../config";
import { IEstablishmentSettings } from "../interfaces/establishmentSettings";
import { putData } from "./putData";

const { SERVER_URL } = config;

export async function putSettings(settings: IEstablishmentSettings): Promise<[ok: boolean, msg: string | null]> {
  const res = await putData(`${SERVER_URL}/establishment`, settings);
  if (res?.status !== "ok") {
    return [false, res?.msg];
  }
  return [true, null];
}
