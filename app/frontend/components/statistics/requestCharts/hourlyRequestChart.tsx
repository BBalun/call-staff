import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      // label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

export default function HourlyRequestChart() {
  return (
    <>
      <Bar data={data} type="bar" />
    </>
  );
}
