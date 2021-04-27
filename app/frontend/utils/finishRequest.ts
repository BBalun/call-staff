import { config } from "../config";
import { putData } from "./putData";

const { SERVER_URL } = config;

export async function finisheRequest(requestId: string): Promise<[ok: boolean, msg: string | null]> {
  // PUT /request/:id/finish
  const res = await putData(`${SERVER_URL}/request/${requestId}/finish`);
  if (res?.status !== "ok") {
    return [false, res?.msg];
  }
  return [true, null];
}
