import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Invoice from "./components/Invoice/Invoice.tsx";
import InvoiceDetail from "./components/Invoice/InvoiceDetail.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InvoiceEmail from "./components/Invoice/InvoiceEmail.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App></App>,
    },
    {
      path: "/invoice",
      element: <Invoice></Invoice>,
    },
    {
      path: "/invoice/detail",
      element: <InvoiceDetail></InvoiceDetail>,
      children: [
        {
          path: "/invoice/detail/:id",
          element: <InvoiceDetail></InvoiceDetail>,
        },
      ],
    },
    {
      path: "/invoice/email/:id",
      element: <InvoiceEmail></InvoiceEmail>,
    },
  ],
  {
    basename: "/",
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </React.StrictMode>
);
