import { config } from "../config";
import { IUser } from "../interfaces/user";
import { postData } from "../utils/postData";

const { SERVER_URL } = config;

export async function fetchUserInfo(): Promise<IUser | null> {
  const response = await (await fetch(`${SERVER_URL}/user`)).json();
  return response?.data;
}

export async function loginUser(userInfo: {
  email: string;
  password: string;
}): Promise<[loginSucces: boolean, msg: string]> {
  const response = await postData(`${SERVER_URL}/login`, userInfo);

  if (response?.status !== "ok") {
    return [false, response?.msg ?? "something went wrong ... please try later"];
  }

  return [true, null];
}

export async function logout(): Promise<boolean> {
  const response = await (await fetch(`${SERVER_URL}/logout`)).json();

  if (response?.status !== "ok") {
    return false;
  }

  return true;
}
