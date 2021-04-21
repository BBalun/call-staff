import { config } from "../config";
import { Group } from "../interfaces/group";

const { SERVER_URL } = config;

export async function fetchGroups(): Array<Group> {
  const res = await fetch(`${SERVER_URL}/groups`);
  const data = await res.json();
  return data as Array<Group>;
}
