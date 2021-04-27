import { config } from "../config";
import { IRequest } from "../interfaces/request";

const { SERVER_URL } = config;

export async function getRequests(
  groupId: string
): Promise<[ok: boolean, data: IRequest[] | null, msg: string | null]> {
  let url = `${SERVER_URL}/requests?finished=false`;
  if (groupId) {
    url = url + `&groupId=${groupId}`;
  }
  const temp = await fetch(url);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}
