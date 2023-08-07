import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { Invoice, InvoiceItemType } from "../../interface/IInvoice";
import { Typography, styled } from "@mui/material";
import {
  filterRequiredShippingInvoices,
  getInvoicesAmountByMonthDistribution,
  getInvoicesDetailAmount,
} from "../../services/InvoiceService";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface InvoiceAmountTypeDoughnutChartProps {
  invoices: Invoice[];
}

export function InvoiceAmountTypeDoughnutChart(
  props: InvoiceAmountTypeDoughnutChartProps
) {
  let invoiceDetailAmount = getInvoicesDetailAmount(props.invoices);
  const data = {
    labels: [InvoiceItemType.MATERIAL, InvoiceItemType.LABOR],
    datasets: [
      {
        label: "Amount($)",
        data: [
          invoiceDetailAmount.materialAmount,
          invoiceDetailAmount.laborAmount,
        ],
        backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Distribution of invoice amount", // Your chart title goes here
      },
    },
  };

  return <Doughnut data={data} options={chartOptions} />;
}

interface InvoiceShppingRequiredDoughnutChartProps {
  invoices: Invoice[];
}

export function InvoiceShppingRequiredDoughnutChart(
  props: InvoiceShppingRequiredDoughnutChartProps
) {
  const countOfShippingRequiredInvoices = filterRequiredShippingInvoices(
    props.invoices
  ).length;
  const countOfNoShippingRequiredInvoices =
    props.invoices.length - countOfShippingRequiredInvoices;
  const data = {
    labels: ["Shipping", "No Shipping"],
    datasets: [
      {
        label: "Invoice",
        data: [
          countOfShippingRequiredInvoices,
          countOfNoShippingRequiredInvoices,
        ],
        backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Distribution of shipping required invoice", // Your chart title goes here
      },
    },
  };

  return <Doughnut data={data} options={chartOptions} />;
}

interface InvoiceAmountMonthLineChartProps {
  invoices: Invoice[];
}

export function InvoiceAmountMonthLineChart(
  props: InvoiceAmountMonthLineChartProps
) {
  const amountByMonth = getInvoicesAmountByMonthDistribution(props.invoices);
  const invoiceDateAmountByMonth = amountByMonth.map(
    (item) => item.invoiceDateAmount
  );
  const dueDateAmountByMonth = amountByMonth.map((item) => item.dueDateAmount);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Invoice Date",
        data: invoiceDateAmountByMonth,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Due Date",
        data: dueDateAmountByMonth,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Distribution of invoice amount by month", // Your chart title goes here
      },
    },
  };

  return <Line data={data} options={chartOptions} />;
}

interface InvoiceDataVisualizationProps {
  invoices: Invoice[];
}

const InvoiceDataVisualizationWrapper = styled("div")(({ theme }) => ({
  maxHeight: "20vh",
  display: "flex",
  justifyContent: "flex-start",
  margin: "1rem",
  gap: "1rem",
}));

function InvoiceDataVisualization(props: InvoiceDataVisualizationProps) {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Invoice Data Visualization
      </Typography>
      <InvoiceDataVisualizationWrapper>
        {props.invoices !== undefined && props.invoices.length > 0 && (
          <>
            <InvoiceAmountTypeDoughnutChart
              invoices={props.invoices}
            ></InvoiceAmountTypeDoughnutChart>
            <InvoiceShppingRequiredDoughnutChart
              invoices={props.invoices}
            ></InvoiceShppingRequiredDoughnutChart>
            <InvoiceAmountMonthLineChart
              invoices={props.invoices}
            ></InvoiceAmountMonthLineChart>
          </>
        )}
      </InvoiceDataVisualizationWrapper>
    </>
  );
}

export default InvoiceDataVisualization;
