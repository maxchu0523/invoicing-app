export interface Invoice {
    id: string | number,
    invoiceNumber: string;
    description: string;
    customerName: string;
    billingAddress: string;
    notes?: string;
    shippingAddress?: string;
    invoiceDate: Date;
    dueDate: Date;
    invoiceItems: InvoiceItem[];

    status: InvoiceStatus;
  }

  export interface InvoiceItem {
    invoiceId : number | string,
    id : number | string,
    description : string,
    type : InvoiceItemType,
    quantity : number,
    rate : number,
    
  }

  


export enum InvoiceStatus {
    DRAFT = 'Draft',
    SENT = 'Sent',
    PAID = 'Paid',
    OUTSTANDING = 'Outstanding',
    CANCELLED = 'Cancelled',
    UNDEFINED = "UNDEFINED"
}

  export enum InvoiceItemType {
    LABOR = 'Labor',
    MATERIAL = 'Material',
    UNDEFINED = '',

  }
  