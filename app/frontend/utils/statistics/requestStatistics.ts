import { config } from "../../config";
import { IRequestStatistics } from "../../interfaces/requestStatistics";

const { SERVER_URL } = config;

export async function getHourlyRequestStatistics(): Promise<
  [ok: boolean, data: IRequestStatistics[] | null, msg: string | null]
> {
  const temp = await fetch(`${SERVER_URL}/statistics/requests/hourly`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}

export async function getDailyRequestStatistics(): Promise<
  [ok: boolean, data: IRequestStatistics[] | null, msg: string | null]
> {
  const temp = await fetch(`${SERVER_URL}/statistics/requests/daily`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}

export async function getMonthlyRequestStatistics(): Promise<
  [ok: boolean, data: IRequestStatistics[] | null, msg: string | null]
> {
  const temp = await fetch(`${SERVER_URL}/statistics/requests/monthly`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}
