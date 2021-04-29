import { config } from "../config";
import { postData } from "./postData";

const { SERVER_URL } = config;

interface INewUser {
  username: string;
  email: string;
  password: string;
  establishmentName: string;
}

export async function createUser({
  username,
  email,
  password,
  establishmentName,
}: INewUser): Promise<[ok: boolean, msg: string | null]> {
  const res = await postData(`${SERVER_URL}/register`, { username, email, password, establishmentName });
  if (res?.status !== "ok") {
    return [false, res?.msg];
  }
  return [true, null];
}
