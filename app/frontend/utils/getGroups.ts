import { config } from "../config";
import { IGroup } from "../interfaces/group";

const { SERVER_URL } = config;

export async function getGroups(): Promise<[ok: boolean, groups: IGroup[] | null, msg: string | null]> {
  const temp = await fetch(`${SERVER_URL}/groups`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}
