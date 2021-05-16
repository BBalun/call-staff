import { config } from "../config";
import { putData } from "./putData";

const { SERVER_URL } = config;

export async function changePassword(
  password: string,
  newPassword: string,
  newPasswordConfirm: string
): Promise<[ok: boolean, msg: string | null]> {
  const res = await putData(`${SERVER_URL}/user/password`, {
    password,
    newPassword,
    newPasswordConfirm,
  });

  if (res?.status !== "ok") {
    return [false, res?.msg];
  }
  return [true, null];
}
