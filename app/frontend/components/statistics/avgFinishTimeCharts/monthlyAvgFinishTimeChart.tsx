import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IFinishTimeStatistics } from "../../../interfaces/finishTimeStatistics";
import { getMonthlyFinishTimeStatistics } from "../../../utils/statistics/finishTimeStatistics";
import { months } from "../../../utils/statistics/months";

export default function MonthlyAvgFinishTimeChart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IFinishTimeStatistics[]>([]);

  async function onLoad() {
    const [ok, data, msg] = await getMonthlyFinishTimeStatistics();
    if (!ok) {
      alert(msg);
      return;
    }
    setData(data.reverse());
    setLoading(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Bar
        data={{
          labels: data.map((x) => months[new Date(x.time).getMonth()]),
          datasets: [
            {
              label: "Avarage time to finish request (in seconds) per month",
              data: data.map((x) => x.avgInSecs),
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        }}
        type="line"
      />
    </>
  );
}
