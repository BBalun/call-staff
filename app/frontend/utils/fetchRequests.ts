import { config } from "../config";
import { IRequest } from "../interfaces/request";

const { SERVER_URL } = config;

export async function fetchRequests(groupId: string): Promise<IRequest[]> {
  let url = `${SERVER_URL}/requests?finished=false`;
  if (groupId) {
    url = url + `&groupId=${groupId}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
