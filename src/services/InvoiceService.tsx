import { Invoice, InvoiceStatus } from "../interface/IInvoice";
import { v4 as uuidv4 } from 'uuid';

export function getEmptyInvoice(): Invoice {

    const newInvoice: Invoice = {
        id: uuidv4(),
        invoiceNumber: "",
        notes: "",
        description: "",
        customerName: "",
        billingAddress: "",
        shippingAddress: "",
        invoiceDate: new Date(),
        dueDate: new Date(),
        invoiceItems: [],
        status: InvoiceStatus.DRAFT,
    }

    return newInvoice;

}


export function getInvoiceAmount(invoice: Invoice): number {
    return invoice.invoiceItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
}