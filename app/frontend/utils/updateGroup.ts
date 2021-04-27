import { config } from "../config";
import { putData } from "./putData";

const { SERVER_URL } = config;

export async function updateGroup(group: { id: string; name: string }): Promise<string | null> {
  const res = await putData(`${SERVER_URL}/group`, group);
  return res?.msg;
}
