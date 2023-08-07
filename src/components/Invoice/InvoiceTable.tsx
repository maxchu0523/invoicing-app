import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import { getInvoices } from '../../api';
import { useEffect, useState } from 'react';
import { Invoice, InvoiceStatus } from '../../interface/IInvoice';
import InvoiceItemTable from './InvoiceItemTable';
import { getInvoiceAmount } from '../../services/InvoiceService';
import InvoiceEmail from './InvoiceEmail';


function Row(props: { invoice: Invoice }) {
    const invoice = props.invoice;
    const [open, setOpen] = useState(false);


    function statusColor(status: string) {
        switch (status) {
            case InvoiceStatus.PAID:
                return '#00e676'; 
            case InvoiceStatus.SENT:
                return '#ffee33';
            case InvoiceStatus.DRAFT:
                return '#fbc02d';
            case InvoiceStatus.OUTSTANDING:
                return '#ff6333';
            case InvoiceStatus.CANCELLED:
                return '#fbc02d';
            default:
                return '#ff3d00';
        }
    }
    

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {invoice.invoiceNumber}
                </TableCell>
                <TableCell align="left">{invoice.description}</TableCell>
                <TableCell align="left">{invoice.customerName}</TableCell>
                <TableCell align="left">{invoice.shippingAddress}</TableCell>
                <TableCell align="left">{invoice.billingAddress}</TableCell>
                <TableCell align="left">{new Date(invoice.invoiceDate).toDateString()}</TableCell>
                <TableCell align="left">{new Date(invoice.dueDate).toDateString()}</TableCell>
                <TableCell align="left" style={{backgroundColor:statusColor(invoice.status), color: 'white',}} >{invoice.status}</TableCell>
                <TableCell align="right">{getInvoiceAmount(invoice)}</TableCell>
                <TableCell align="center"><InvoiceEmail invoice={invoice}></InvoiceEmail></TableCell>
            </TableRow>
            <TableRow>
                {/* Invoice Item Collapse */}
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <InvoiceItemTable invoiceItems={invoice.invoiceItems} invoiceId={invoice.id}  ></InvoiceItemTable>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));




function InvoiceTable() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);


    useEffect(() => {
        getInvoices().then((res) => {
            return setInvoices(res);
        })
    }, []);


    return (
        <TableContainer component={Paper}>
            <Table aria-label="invoice">
                {/* Table Header */}
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Invoice Item</StyledTableCell>
                        <StyledTableCell>Invoice #</StyledTableCell>
                        <StyledTableCell align="left">Invoice</StyledTableCell>
                        <StyledTableCell align="left">Customer</StyledTableCell>
                        <StyledTableCell align="left">Shipping Address</StyledTableCell>
                        <StyledTableCell align="left">Billing Address</StyledTableCell>
                        <StyledTableCell align="left">Invoice Date</StyledTableCell>
                        <StyledTableCell align="left">Due Date</StyledTableCell>
                        <StyledTableCell align="left">Status</StyledTableCell>
                        <StyledTableCell align="right">Total Amount</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                {/* Table Row */}
                <TableBody>
                    {invoices.map((invoice) => (
                        <Row key={invoice.id} invoice={invoice} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InvoiceTable
