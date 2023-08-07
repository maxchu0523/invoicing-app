import { Invoice, InvoiceStatus, InvoiceItemType } from "../interface/IInvoice";
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




export function getInvoiceDetailAmount(invoice: Invoice): {totalAmount: number, materialAmount:number, laborAmount:number} {
    // Refactor this function to use one loop instead of three
    let totalAmount = 0;
    let materialAmount = 0;
    let laborAmount = 0;

    invoice.invoiceItems.forEach((item) => {
        if (item.type === InvoiceItemType.MATERIAL) {
            materialAmount += item.quantity * item.rate;
        } else if (item.type === InvoiceItemType.LABOR) {
            laborAmount += item.quantity * item.rate;
        }   

    });
    totalAmount = materialAmount + laborAmount;
    return {
        totalAmount: totalAmount,
        materialAmount: materialAmount,
        laborAmount: laborAmount
    }
}


export function getInvoicesDetailAmount(invoices: Invoice[]): {totalAmount: number, materialAmount:number, laborAmount:number} {
    let totalAmount = 0;
    let materialAmount = 0;
    let laborAmount = 0;

    invoices.forEach((invoice) => {
        let invoiceDetailAmount = getInvoiceDetailAmount(invoice);
        totalAmount += invoiceDetailAmount.totalAmount;
        materialAmount += invoiceDetailAmount.materialAmount;
        laborAmount += invoiceDetailAmount.laborAmount;
        
    });

    return {
        totalAmount: totalAmount,
        materialAmount: materialAmount,
        laborAmount: laborAmount
    }
}


export function filterRequiredShippingInvoices(invoices: Invoice[]): Invoice[] {
    return invoices.filter((invoice) => invoice.shippingAddress !== "" && invoice.shippingAddress !== undefined && invoice.shippingAddress !== null);
}