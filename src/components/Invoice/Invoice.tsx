import { Typography } from '@mui/material';
import InvoiceTable from './InvoiceTable';
import InvoiceControlBar from './InvoiceControlBar';



function Invoice() {

    return (
        <>
            <Typography variant="h1" gutterBottom>
                Invoice
            </Typography>
            <InvoiceControlBar></InvoiceControlBar>
            <InvoiceTable />

        </>
    )
}

export default Invoice