import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IRequestStatistics } from "../../../interfaces/requestStatistics";
import { getDailyRequestStatistics } from "../../../utils/statistics/requestStatistics";

export default function DailyRequestChart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IRequestStatistics[]>([]);

  async function onLoad() {
    const [ok, data, msg] = await getDailyRequestStatistics();
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
          labels: data.map((x) => new Date(x.time).toLocaleDateString()),
          datasets: [
            {
              label: "Num. of requests per day",
              data: data.map((x) => x.count),
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        }}
        type="bar"
      />
    </>
  );
}
