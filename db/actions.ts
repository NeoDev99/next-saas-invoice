import { invoicesDB, customersDB, bankInfoDB } from ".";
import { invoicesTable, customersTable, bankInfoTable } from './schema';
import { desc, eq } from "drizzle-orm";

// 👇🏻 add a new row to the invoices table
export const createInvoice = async (invoice: any) => {
	await invoicesDB.insert(invoicesTable).values({
    owner_id: invoice.user_id,
    customer_id: invoice.customer_id,
    title: invoice.title,
    items: invoice.items,
    total_amount: invoice.total_amount,
    });
};

// 👇🏻 Get all user's invoices
export const getUserInvoices = async (user_id: string) => {
  return await invoicesDB.select()
    .from(invoicesTable)
    .where(eq(invoicesTable.owner_id, user_id))
    .orderBy(desc(invoicesTable.created_at));
};

// 👇🏻 get single invoice
export const getSingleInvoice = async (id: number) => {
  return await invoicesDB.select().from(invoicesTable).where(eq(invoicesTable.id, id));
};

// 👇🏻 get customers list
export const getCustomers = async (user_id: string) => {
	return await customersDB.select().from(customersTable).where(eq(customersTable.owner_id, user_id)).orderBy(desc(customersTable.created_at));
};

// 👇🏻 get single customer
export const getSingleCustomer = async (name: string) => {
    return await customersDB.select().from(customersTable).where(eq(customersTable.name, name));
};

// 👇🏻 add a new row to the customers table
export const addCustomer = async (customer: Customer) => {
	await customersDB.insert(customersTable).values({
        owner_id: customer.user_id,
        name: customer.name,
        email: customer.email,
        address: customer.address,
    });
};

// 👇🏻 delete a customer
export const deleteCustomer = async (id: number) => {
  await customersDB.delete(customersTable).where(eq(customersTable.id, id));
};

// 👇🏻 edit a customer's information
export const editCustomer = async (id: number, customer: Partial<Customer>) => {
    await customersDB
        .update(customersTable)
        .set({
            name: customer.name,
            email: customer.email,
            address: customer.address,
        })
        .where(eq(customersTable.id, id));
};

// 👇🏻 get user's bank info
export const getUserBankInfo = async (user_id: string) => {
	return await bankInfoDB.select().from(bankInfoTable).where(eq(bankInfoTable.owner_id, user_id));
};

// 👇🏻 update bank info table
export const updateBankInfo = async (info: any) => {
await bankInfoDB.insert(bankInfoTable)
    .values({
        owner_id: info.user_id,
        bank_name: info.bank_name,
        account_number: info.account_number,
        account_name: info.account_name,
        currency: info.currency,
        })
        .onConflictDoUpdate({
            target: bankInfoTable.owner_id,
            set: {
                bank_name: info.bank_name,
                account_number: info.account_number,
                account_name: info.account_name,
                currency: info.currency,
            },
        });
};

/*
import { invoicesDB, customersDB, bankInfoDB } from ".";
import { invoicesTable, customersTable, bankInfoTable } from './schema';
import { desc, eq } from "drizzle-orm";

// Create a new invoice
export const createInvoice = async (invoice: Invoice) => {
  await invoicesDB.insert(invoicesTable).values(invoice);
};

// Get all user's invoices
export const getUserInvoices = async (user_id: string) => {
  return await invoicesDB.select()
    .from(invoicesTable)
    .where(eq(invoicesTable.owner_id, user_id))
    .orderBy(desc(invoicesTable.created_at));
};

// Get single invoice
export const getSingleInvoice = async (id: number) => {
  return await invoicesDB.select()
    .from(invoicesTable)
    .where(eq(invoicesTable.id, id));
};

// Get customers list
export const getCustomers = async (user_id: string) => {
  return await customersDB.select()
    .from(customersTable)
    .where(eq(customersTable.owner_id, user_id))
    .orderBy(desc(customersTable.created_at));
};

// Get single customer
export const getSingleCustomer = async (name: string) => {
  return await customersDB.select()
    .from(customersTable)
    .where(eq(customersTable.name, name));
};

// Add a new customer
export const addCustomer = async (customer: Customer) => {
  await customersDB.insert(customersTable).values(customer);
};

// Delete a customer
export const deleteCustomer = async (id: number) => {
  await customersDB.delete(customersTable).where(eq(customersTable.id, id));
};

// Get user's bank info
export const getUserBankInfo = async (user_id: string) => {
  return await bankInfoDB.select()
    .from(bankInfoTable)
    .where(eq(bankInfoTable.owner_id, user_id));
};

// Update bank info
export const updateBankInfo = async (info: BankInfo) => {
  await bankInfoDB.insert(bankInfoTable)
    .values(info)
    .onConflictDoUpdate({
      target: bankInfoTable.owner_id,
      set: {
        bank_name: info.bank_name,
        account_number: info.account_number,
        account_name: info.account_name,
        currency: info.currency,
      },
    });
};
*/