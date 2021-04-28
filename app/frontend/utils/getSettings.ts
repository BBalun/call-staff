import { config } from "../config";
import { IEstablishmentSettings } from "../interfaces/establishmentSettings";

const { SERVER_URL } = config;

export async function getSettings(): Promise<[ok: boolean, data: IEstablishmentSettings | null, msg: string | null]> {
  const temp = await fetch(`${SERVER_URL}/establishment`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}
