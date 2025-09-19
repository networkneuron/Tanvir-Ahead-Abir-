export interface Client {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
}

export interface Invoice {
    _id: string;
    invoiceNumber: string;
    client: Client;
    issueDate: string;
    dueDate: string;
    items: InvoiceItem[];
    status: 'Paid' | 'Unpaid' | 'Pending';
}

export interface Expense {
    _id: string;
    category: 'Software' | 'Hardware' | 'Marketing' | 'Contractors' | 'Other';
    description: string;
    amount: number;
    date: string;
}
