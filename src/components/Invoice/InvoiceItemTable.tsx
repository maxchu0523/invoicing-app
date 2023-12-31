import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { InvoiceItem, InvoiceItemType } from "../../interface/IInvoice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface AddInvoiceItemProp {
  invoiceId: string | number;
  invoiceItems: InvoiceItem[];
  setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
}

function AddInvoiceItem(addInvoiceItemProp: AddInvoiceItemProp) {
  const { control, handleSubmit } = useForm<InvoiceItem>();

  const onSubmit: SubmitHandler<InvoiceItem> = (data) => {
    // Process the form data and create the InvoiceItem object
    const newInvoiceItem: InvoiceItem = {
      invoiceId: addInvoiceItemProp.invoiceId,
      id: uuidv4(),
      description: data.description,
      type: data.type,
      quantity: data.quantity,
      rate: data.rate,
    };
    addInvoiceItemProp.setInvoiceItems([
      ...addInvoiceItemProp.invoiceItems,
      newInvoiceItem,
    ]);
  };

  return (
    <>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Add Invoice Item
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiFormControl-root": {
              marginTop: 1,
              marginBottom: 1,
              marginRight: 2,
            },
            "& .MuiButtonBase-root ": {
              marginTop: 1,
              marginBottom: 1,
              marginRight: 2,
            },
          }}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                data-testid="invoice-item-description"
                required
                {...field}
                label="Description"
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            defaultValue={InvoiceItemType.LABOR} // Replace with your default value if needed
            render={({ field }) => (
              <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select {...field} label="Type">
                  <MenuItem value={InvoiceItemType.LABOR}>
                    {InvoiceItemType.LABOR}
                  </MenuItem>
                  <MenuItem value={InvoiceItemType.MATERIAL}>
                    {InvoiceItemType.MATERIAL}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="quantity"
                required
                {...field}
                label="Quantity"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
            )}
          />

          <Controller
            name="rate"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="rate"
                required
                {...field}
                label="Rate"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
}

interface InvoiceItemTableProps {
  invoiceId: string | number;
  invoiceItems: InvoiceItem[];
  setInvoiceItems?: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
}

function InvoiceItemTable(props: InvoiceItemTableProps) {
  const invoiceItems = props.invoiceItems;

  const deleteInvoiceItem = (invoiceItemId: string | number) => {
    if (props.setInvoiceItems !== undefined)
      props.setInvoiceItems(
        invoiceItems.filter((invoiceItem) => invoiceItem.id !== invoiceItemId)
      );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <>
      {props.setInvoiceItems !== undefined ? (
        <AddInvoiceItem
          invoiceItems={props.invoiceItems}
          setInvoiceItems={props.setInvoiceItems}
          invoiceId={props.invoiceId}
        ></AddInvoiceItem>
      ) : (
        <></>
      )}
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Invoice Item
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="invoice item">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell align="right">
                  Hours / Quantity
                </StyledTableCell>
                <StyledTableCell align="right">Rate / Cost ($)</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
                {props.setInvoiceItems !== undefined ? (
                  <StyledTableCell align="center">Action</StyledTableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceItems.map((invoiceItem: InvoiceItem) => (
                <TableRow key={invoiceItem.id}>
                  <TableCell align="left">{invoiceItem.description}</TableCell>
                  <TableCell align="left">{invoiceItem.type}</TableCell>
                  <TableCell align="right">{invoiceItem.quantity}</TableCell>
                  <TableCell align="right">{invoiceItem.rate}</TableCell>
                  <TableCell align="right">
                    {invoiceItem.quantity * invoiceItem.rate}
                  </TableCell>
                  {props.setInvoiceItems !== undefined ? (
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          deleteInvoiceItem(invoiceItem.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  ) : (
                    <></>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default InvoiceItemTable;
