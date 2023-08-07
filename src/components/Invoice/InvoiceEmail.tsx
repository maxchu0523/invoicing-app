import { useEffect, useState } from "react";
import { Invoice } from "../../interface/IInvoice";
import { useParams } from "react-router-dom";
import { getInvoice } from "../../services/Api";
import { getInvoiceAmount } from "../../services/InvoiceService";
import { Button } from "@mui/material";

interface InvoiceEmailProps {
  invoice?: Invoice;
}

function InvoiceEmail(props: InvoiceEmailProps) {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    if (id !== undefined && props.invoice === undefined) {
      getInvoice(id).then((res) => {
        return setInvoice(res);
      });
    } else {
      setInvoice(props.invoice);
    }
  }, []);

  const composeEmail = () => {
    if (invoice === undefined) {
      return "";
    }

    const emailContent = `Hello ${invoice.customerName},

I hope you’re well. Please see the invoice details:
        
Invoice Number: ${invoice.invoiceNumber}
Description: ${invoice.description}
Billing Address: ${invoice.billingAddress}
Notes: ${invoice.notes || "N/A"}
Shipping Address: ${invoice.shippingAddress || "N/A"}
Invoice Date: ${invoice.invoiceDate.toString()}
Due Date: ${invoice.dueDate.toString()}

Invoice Items:
${invoice.invoiceItems
  .map(
    (item) =>
      `${item.description}: ${item.quantity} x ${item.rate} = ${
        item.quantity * item.rate
      }`
  )
  .join("\n")}

Total Amount: ${getInvoiceAmount(invoice)}

If you have any questions, please feel free to reach out to us.

Kind regards,
Max`;

    return emailContent;
  };

  const handleComposeEmail = () => {
    const emailContent = composeEmail();
    const subject = encodeURIComponent(`Invoice ${invoice?.invoiceNumber}`);
    window.location.href = `mailto:${
      invoice?.billingAddress
    }?subject=${subject}&body=${encodeURIComponent(emailContent)}`;
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        handleComposeEmail();
      }}
    >
      Send by Email
    </Button>
  );
}

export default InvoiceEmail;
