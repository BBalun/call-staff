import { config } from "../config";
import { User } from "../interfaces/user";
import { postData } from "../utils/postData";

const { SERVER_URL } = config;

export async function fetchUserInfo(): Promise<User> {
  const response = await (await fetch(`${SERVER_URL}/user`)).json();
  return response?.data;
}

export async function loginUser(userInfo: { email: string; password: string }): Promise<boolean> {
  const response = await postData(`${SERVER_URL}/login`, userInfo);

  if (response?.status !== "ok") {
    return false;
  }

  return true;
}

export async function logout(): Promise<boolean> {
  const response = await (await fetch(`${SERVER_URL}/logout`)).json();

  if (response?.status !== "ok") {
    return false;
  }

  return true;
}
