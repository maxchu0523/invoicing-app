import * as React from "react";

import { useState } from "react";
import { Invoice, InvoiceStatus } from "../../interface/IInvoice";
import InvoiceItemTable from "./InvoiceItemTable";
import { getInvoiceAmount } from "../../services/InvoiceService";
import InvoiceEmail from "./InvoiceEmail";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Typography,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  tableCellClasses,
  TableBody,
  Table,
  IconButton,
  Collapse,
  styled,
  Paper,
} from "@mui/material";

function Row(props: { invoice: Invoice }) {
  const invoice = props.invoice;
  const [open, setOpen] = useState(false);

  function statusColor(status: string) {
    switch (status) {
      case InvoiceStatus.PAID:
        return "#00e676";
      case InvoiceStatus.SENT:
        return "#ffee33";
      case InvoiceStatus.DRAFT:
        return "#fbc02d";
      case InvoiceStatus.OUTSTANDING:
        return "#ff6333";
      case InvoiceStatus.CANCELLED:
        return "#818589";
      default:
        return "#ff3d00";
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {invoice.invoiceNumber}
        </TableCell>
        <TableCell align="left">{invoice.description}</TableCell>
        <TableCell align="left">{invoice.customerName}</TableCell>
        <TableCell align="left">{invoice.shippingAddress}</TableCell>
        <TableCell align="left">{invoice.billingAddress}</TableCell>
        <TableCell align="left">
          {new Date(invoice.invoiceDate).toDateString()}
        </TableCell>
        <TableCell align="left">
          {new Date(invoice.dueDate).toDateString()}
        </TableCell>
        <TableCell
          align="left"
          style={{
            backgroundColor: statusColor(invoice.status),
            color: "white",
          }}
        >
          {invoice.status}
        </TableCell>
        <TableCell align="right">{getInvoiceAmount(invoice)}</TableCell>
        <TableCell align="center">
          <InvoiceEmail invoice={invoice}></InvoiceEmail>
        </TableCell>
      </TableRow>
      <TableRow>
        {/* Invoice Item Collapse */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            data-testid="collapse-invoice-item"
          >
            <InvoiceItemTable
              invoiceItems={invoice.invoiceItems}
              invoiceId={invoice.id}
            ></InvoiceItemTable>
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

interface InvoiceTableProps {
  invoices: Invoice[];
}

function InvoiceTable(props: InvoiceTableProps) {
  const invoices = props.invoices;

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Invoice Table
      </Typography>
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
    </>
  );
}

export default InvoiceTable;
