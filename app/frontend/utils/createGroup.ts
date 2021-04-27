import { config } from "../config";
import { IGroup } from "../interfaces/group";
import { postData } from "./postData";

const { SERVER_URL } = config;

export default async function createGroup(
  groupName: string
): Promise<[ok: true, data: IGroup] | [ok: false, msg: string]> {
  const res = await postData(`${SERVER_URL}/group`, { name: groupName });
  if (res?.status !== "ok") {
    return [false, res?.msg];
  }
  return [true, res?.data];
}
