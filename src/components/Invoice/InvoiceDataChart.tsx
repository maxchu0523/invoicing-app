import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function InvoiceDoughnutChart() {
  const data = {
    labels: ["Yellow", "Green"],
    datasets: [
      {
        label: "# of Votes",
        data: [3, 5],
        backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
