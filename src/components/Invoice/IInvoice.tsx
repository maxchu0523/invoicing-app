interface IInvoice {
    id: number,
    invoiceTitle: string;
    invoiceNumber: string;

    // In read lift: customer Id 
    customerName: string;
    
    billingAddress: string;
    invoiceItem : IInvoiceItem[];
    invoiceDate: Date;
    dueDate: Date;
    status: InvoiceStatus;
  }


  interface IInvoiceItem {
    invoiceId : number,

    // labor cost = laborHours * laborRate
    laborHours? : number,
    laborRate? : number

    otherExpneses? : [IOterExpense] 
  }

  interface IOterExpense {
    name : string,
    amount : number,
  }
  
  
  enum InvoiceStatus {
    DRAFT = 'Draft',
    SENT = 'Sent',
    PAID = 'Paid',
    OUTSTANDING = 'Outstanding',
    CANCELLED = 'Cancelled',
  }
  