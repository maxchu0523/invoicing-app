import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Invoice, InvoiceItem, InvoiceStatus } from "../../interface/IInvoice";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import InvoiceItemTable from "./InvoiceItemTable";
import { getEmptyInvoice } from "../../services/InvoiceService";
import { postInvoice } from "../../services/Api";

function InvoiceDetail() {
  const navigate = useNavigate();

  const { id } = useParams();

  // TODO implement view onluy functionality
  const mode = id === undefined || id === null ? "create" : "view";

  const newInvoice = getEmptyInvoice();
  const [invoice, setInvoice] = useState<Invoice>(newInvoice);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  // React hock form
  const { handleSubmit, control, reset } = useForm<Invoice>();

  const onSubmit: SubmitHandler<Invoice> = (data) => {
    data.invoiceItems = invoiceItems;
    postInvoice(data).then((res) => {
      // TODO: handle error & success
      navigate("/invoice");
    });
  };

  useEffect(() => {
    if (mode === "view") {
      // TODO: fetch invoice by id to implement view functionality
    }
  }, [id, reset]);

  const InvoiceDetailWrapper = styled("div")(({ theme }) => ({
    display: "flex",
  }));

  const InvoiceFormWrapper = styled("div")(({ theme }) => ({
    flex: 1,
  }));

  const InvoiceItemWrapper = styled("div")(({ theme }) => ({
    flex: 1,
  }));

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Invoice
      </Typography>

      <InvoiceDetailWrapper>
        <InvoiceFormWrapper>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h6" gutterBottom component="div">
              Create Invoice
            </Typography>
            <Controller
              name="invoiceNumber"
              control={control}
              defaultValue={invoice.invoiceNumber}
              render={({ field }) => (
                <TextField
                  required
                  label="Invoice #"
                  data-testid="invoice-number"
                  {...field}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              defaultValue={invoice.description}
              render={({ field }) => (
                <TextField
                  required
                  label="Description"
                  data-testid="description"
                  {...field}
                  fullWidth
                />
              )}
            />

            <br></br>

            <Controller
              name="notes"
              control={control}
              defaultValue={invoice.notes}
              render={({ field }) => (
                <TextField
                  label="Notes"
                  {...field}
                  rows={8}
                  data-testid="notes"
                  multiline
                  fullWidth
                />
              )}
            />

            <br></br>

            <Controller
              name="customerName"
              control={control}
              defaultValue={invoice.customerName}
              render={({ field }) => (
                <TextField
                  required
                  label="Customer Name"
                  {...field}
                  data-testid="customer-name"
                />
              )}
            />

            <Controller
              name="billingAddress"
              control={control}
              defaultValue={invoice.billingAddress}
              render={({ field }) => (
                <TextField
                  required
                  label="Billing Address"
                  {...field}
                  data-testid="billing-address"
                />
              )}
            />

            <Controller
              name="shippingAddress"
              control={control}
              defaultValue={invoice.shippingAddress}
              render={({ field }) => (
                <TextField
                  label="Shipping Address"
                  {...field}
                  data-testid="shipping-address"
                />
              )}
            />

            <br></br>

            <Controller
              name="invoiceDate"
              control={control}
              defaultValue={invoice.invoiceDate}
              render={({ field }) => (
                <DatePicker
                  label="Invoice Date"
                  value={dayjs(field.value)}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />

            <Controller
              name="dueDate"
              control={control}
              defaultValue={invoice.dueDate}
              render={({ field }) => (
                <DatePicker
                  label="Due Date"
                  value={dayjs(field.value)}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" required>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value={InvoiceStatus.DRAFT}>
                      {InvoiceStatus.DRAFT}
                    </MenuItem>
                    <MenuItem value={InvoiceStatus.SENT}>
                      {InvoiceStatus.SENT}
                    </MenuItem>
                    <MenuItem value={InvoiceStatus.OUTSTANDING}>
                      {InvoiceStatus.OUTSTANDING}
                    </MenuItem>
                    <MenuItem value={InvoiceStatus.PAID}>
                      {InvoiceStatus.PAID}
                    </MenuItem>
                    <MenuItem value={InvoiceStatus.CANCELLED}>
                      {InvoiceStatus.CANCELLED}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <br></br>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </InvoiceFormWrapper>

        <InvoiceItemWrapper>
          <InvoiceItemTable
            invoiceItems={invoiceItems}
            setInvoiceItems={setInvoiceItems}
            invoiceId={invoice.id}
          ></InvoiceItemTable>
        </InvoiceItemWrapper>
      </InvoiceDetailWrapper>
    </>
  );
}

export default InvoiceDetail;
