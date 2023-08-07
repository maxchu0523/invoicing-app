import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Invoice, InvoiceItemType } from "../../interface/IInvoice";
import { Typography, styled } from "@mui/material";
import {
  filterRequiredShippingInvoices,
  getInvoicesDetailAmount,
} from "../../services/InvoiceService";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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
        text: "Distribution of Invoice Amount", // Your chart title goes here
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
  debugger;
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
        text: "Distribution of Shipping required invoice", // Your chart title goes here
      },
    },
  };

  return <Doughnut data={data} options={chartOptions} />;
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
        Invoice Data Summarization
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
          </>
        )}
      </InvoiceDataVisualizationWrapper>
    </>
  );
}

export default InvoiceDataVisualization;
