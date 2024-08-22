interface BankInfo {
    user_id: string;
    account_name: string;
    account_number: number;
    bank_name: string;
    currency: string;
}

interface Customer {
  id?: string;
  user_id: string;
  name: string;
  email: string;
  address: string;
  createdAt?: string;
}


interface Item {
    id: string;
    name: string;
    cost: number;
    quantity: number;
    price: number;
}

interface Invoice {
    id?: string;
    created_at?: string;
    user_id:  string;
    customer_id: number;
    title: string;
    items: string;
    total_amount: number;
}


/*
export interface Invoice {
  items: any[]; // You might want to define a specific type for items
}
*/
