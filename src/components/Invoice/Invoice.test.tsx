
import { render, screen, waitFor, within } from "@testing-library/react";
import Invoice from "./Invoice";
import userEvent from "@testing-library/user-event";

import { BrowserRouter, RouterProvider } from "react-router-dom";
import InvoiceDetail from "./InvoiceDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactElement } from "react";


const renderInvoice = async () => {
  render(<LocalizationProvider dateAdapter={AdapterDayjs}><Invoice /></LocalizationProvider>, { wrapper: BrowserRouter })

};


const renderInvoiceDetail = async () => {
  render(<LocalizationProvider dateAdapter={AdapterDayjs}><InvoiceDetail /></LocalizationProvider>, { wrapper: BrowserRouter })

};



test('create new invoice', async () => {

  test('should create new invoice', async () => {
    const user = userEvent.setup();
    await renderInvoiceDetail();
  
  
    expect(screen.getByText("Create Invoice")).toBeInTheDocument();
  
    await user.type(screen.getByTestId("invoice-number"), "test invoiceNumber");
    await user.type(screen.getByTestId("description"), "test description");
    await user.type(screen.getByTestId("notes"), "test notes");
    await user.type(screen.getByTestId("customer-name"), "test customerName");
    await user.type(screen.getByTestId("billing-address"), "test billingAddress");
    await user.type(screen.getByTestId("shipping-address"), "test shippingAddress");


    await user.type(screen.getByTestId("invoice-item-description"), "test invoice-item-description");
    await user.type(screen.getByTestId("quantity"), "20");
    await user.type(screen.getByTestId("rate"), "30");
    await user.click(screen.getByRole("button", { name: "Add" }));
  
    await user.click(screen.getByRole("button", { name: "Save" }));
  });



  test('should have new created invoice', async () => {
    await renderInvoice();
    expect(screen.getByText("test invoiceNumber")).toBeInTheDocument();
    expect(screen.getByText("test description")).toBeInTheDocument();
    expect(screen.getByText("test notes")).toBeInTheDocument();
    expect(screen.getByText("test customerName")).toBeInTheDocument();


  });

});

