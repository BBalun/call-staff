import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IRequestStatistics } from "../../../interfaces/requestStatistics";
import { getMonthlyRequestStatistics } from "../../../utils/statistics/requestStatistics";
import { months } from "../../../utils/statistics/months";

export default function MonthlyRequestChart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IRequestStatistics[]>([]);

  async function onLoad() {
    const [ok, data, msg] = await getMonthlyRequestStatistics();
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
              label: "Num. of requests per month",
              data: data.map((x) => x.count),
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        }}
        type="bar"
      />
    </>
  );
}
