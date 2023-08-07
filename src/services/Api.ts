import axios from "axios";
import { Invoice } from "../interface/IInvoice";

const domain = "http://localhost:3000/";

export async function getInvoices() {
  return axios.get(domain + "invoice").then((response) => {
    let rew: Invoice[] = response.data;
    return rew;
  });
}

export async function getInvoice(invoiceId: number | string) {
  return axios.get(domain + "invoice/" + invoiceId).then((response) => {
    let rew: Invoice = response.data;
    return rew;
  });
}

export async function postInvoice(invoice: Invoice) {
  return axios.post(domain + "invoice", invoice).then((response) => {
    let rew: Invoice[] = response.data;
    return rew;
  });
}
