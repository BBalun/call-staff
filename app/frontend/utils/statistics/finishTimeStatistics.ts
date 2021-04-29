import { config } from "../../config";
import { IFinishTimeStatistics } from "../../interfaces/finishTimeStatistics";

const { SERVER_URL } = config;

export async function getHourlyFinishTimeStatistics(): Promise<
  [ok: boolean, data: IFinishTimeStatistics[] | null, msg: string | null]
> {
  const temp = await fetch(`${SERVER_URL}/statistics/finishTime/hourly`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}

export async function getDailyFinishTimeStatistics(): Promise<
  [ok: boolean, data: IFinishTimeStatistics[] | null, msg: string | null]
> {
  const temp = await fetch(`${SERVER_URL}/statistics/finishTime/daily`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}

export async function getMonthlyFinishTimeStatistics(): Promise<
  [ok: boolean, data: IFinishTimeStatistics[] | null, msg: string | null]
> {
  const temp = await fetch(`${SERVER_URL}/statistics/finishTime/monthly`);
  const res = await temp.json();
  if (res?.status !== "ok") {
    return [false, null, res?.msg];
  }
  return [true, res?.data, null];
}
