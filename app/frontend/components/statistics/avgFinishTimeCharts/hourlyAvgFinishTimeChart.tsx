import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IFinishTimeStatistics } from "../../../interfaces/finishTimeStatistics";
import { getHourlyFinishTimeStatistics } from "../../../utils/statistics/finishTimeStatistics";

export default function HourlyAvgFinishTimeChart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IFinishTimeStatistics[]>([]);

  async function onLoad() {
    const [ok, data, msg] = await getHourlyFinishTimeStatistics();
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
          labels: data.map((x) => new Date(x.time).toLocaleTimeString()),
          datasets: [
            {
              label: "Avarage time to finish request (in seconds) per hour",
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
