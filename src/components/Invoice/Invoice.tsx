import { Typography } from "@mui/material";
import InvoiceTable from "./InvoiceTable";
import InvoiceControlBar from "./InvoiceControlBar";
import InvoiceDataVisualization from "./InvoiceDataVisualization";
import { useEffect, useState } from "react";
import { getInvoices } from "../../services/Api";
import { Invoice as IInvoice } from "../../interface/IInvoice";

function Invoice() {
    const [invoices, setInvoices] = useState<IInvoice[]>([]);
    useEffect(() => {
        getInvoices().then((res) => {
            return setInvoices(res);
        });
    }, []);

    return (
        <>
            <Typography variant="h1" gutterBottom>
                Invoice
            </Typography>
            <InvoiceDataVisualization invoices={invoices}></InvoiceDataVisualization>
            <InvoiceControlBar></InvoiceControlBar>
            <InvoiceTable invoices={invoices} />
        </>
    );
}

export default Invoice;
