"use client";

import React, { forwardRef, useRef, useCallback, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, Send } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import InvoiceTable from "@/components/dashboard/InvoiceTable";
import Loading from "@/components/dashboard/Loading";

interface Props {
	id: string;
	customer: Customer;
	bankInfo: BankInfo;
	invoice: Invoice;
}

const formatDateString = (dateString: string): string => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	return `${day} ${month}, ${year}`;
};

const ComponentToPrint = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const { id, customer, invoice, bankInfo } = props as Props;

	return (
		<div className='w-full px-2 py-8' ref={ref}>
			<div className='lg:w-2/3 w-full mx-auto shadow-md border-[1px] rounded min-h-[75vh] p-5'>
				<header className='w-full flex items-center space-x-4 justify-between'>
					<div className='w-4/5'>
						<h2 className='text-lg font-semibold mb-3'>INVOICE #0{id}</h2>
						<section className='mb-6'>
							<p className='opacity-60'>
								Issuer Name: {bankInfo?.account_name}
							</p>
							<p className='opacity-60'>
								Date: {formatDateString(invoice?.created_at!)}
							</p>
						</section>
						<h2 className='text-lg font-semibold mb-2'>TO:</h2>
						<section className='mb-6'>
							<p className='opacity-60'>Name: {invoice?.customer_id}</p>
							<p className='opacity-60'>Address: {customer?.address}</p>
							<p className='opacity-60'>Email: {customer?.email}</p>
						</section>
					</div>

					<div className='w-1/5 flex flex-col'>
						<p className='font-extrabold text-2xl'>{`${
							bankInfo?.currency
						}${Number(invoice?.total_amount).toLocaleString()}`}</p>
						<p className='text-sm opacity-60'>Total Amount</p>
					</div>
				</header>
				<div>
					<p className='opacity-60'>Subject:</p>
					<h2 className='text-lg font-semibold'>{invoice?.title}</h2>
				</div>

				<InvoiceTable
					itemList={invoice?.items ? JSON.parse(invoice.items) : []}
				/>
			</div>
		</div>
	);
});
ComponentToPrint.displayName = "ComponentToPrint";

export default function Invoices() {
	const { isLoaded, isSignedIn, user } = useUser();
	const { id } = useParams<{ id: string }>();
	const searchParams = useSearchParams();
	const [customer, setCustomer] = useState<Customer>();
	const [bankInfo, setBankInfo] = useState<BankInfo>();
	const [invoice, setInvoice] = useState<Invoice>();
	const [disabled, setDisabled] = useState<boolean>(false);
	const name = searchParams.get("customer");
	const componentRef = useRef<any>();

	async function fetchData<T>(endpoint: string): Promise<T> {
		const response = await fetch(endpoint);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch from ${endpoint}: ${response.statusText}`
			);
		}
		return response.json();
	}

	const getAllInvoiceData = useCallback(async () => {
		try {
			const [customer, bankInfo, invoice] = await Promise.all([
				fetchData<any>(`/api/customers/single?name=${name}`),
				fetchData<any>(`/api/bank-info?userID=${user?.id}`),
				fetchData<any>(`/api/invoices/single?id=${id}`),
			]);
			setCustomer(customer?.customer[0]);
			setBankInfo(bankInfo?.bankInfo[0]);
			setInvoice(invoice?.invoice[0]);
		} catch (err) {
			console.error(err);
		}
	}, [id, name, user]);

	useEffect(() => {
		getAllInvoiceData();
	}, [id, name, user, getAllInvoiceData]);

	const handleSendInvoice = async () => {
		try {
			const request = await fetch("/api/invoices/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					invoiceID: id,
					items: invoice?.items,
					title: invoice?.title,
					amount: invoice?.total_amount,
					customerEmail: customer?.email,
					issuerName: bankInfo?.account_name,
					accountNumber: bankInfo?.account_number,
					currency: bankInfo?.currency,
				}),
			});
			const response = await request.json();
			setDisabled(false);
			alert(response.message);
			
		} catch (err) {
			console.error(err);
		}
	};

	const handlePrint = useReactToPrint({
		documentTitle: "Invoice",
		content: () => componentRef.current,
	});

	if (!isLoaded || !isSignedIn) {
		return <Loading />;
	}

	return (
		<main className='w-full min-h-screen'>
			<section className='w-full flex p-4 items-center justify-center space-x-5 mb-3'>
				<Button size="lg" className='bg-blue-900 p-3 text-white mt-4 h-8 gap-2' onClick={handlePrint}>
					<Download className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Download
					</span>
				</Button>

				<Button
					size="lg"
					className='bg-green-700 p-3 text-white mt-4 h-8 gap-2'
					onClick={() => {
						setDisabled(true);
						handleSendInvoice()
					}}
					disabled={disabled}
				>
					<Send className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						{disabled ? "Sending..." : "Send Invoice"}
					</span>
				</Button>
			</section>
			
			{bankInfo && customer && invoice && (
				<ComponentToPrint
					ref={componentRef}
					id={id}
					customer={customer}
					bankInfo={bankInfo}
					invoice={invoice}
				/>
			)}
		</main>
	);
}


/**
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

	return (
		<Tabs defaultValue="all">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="active">Active</TabsTrigger>
					<TabsTrigger value="draft">Draft</TabsTrigger>
					<TabsTrigger value="archived" className="hidden sm:flex">
						Archived
					</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
				<Button size="lg" className='bg-blue-900 p-3 text-white mt-4 h-8 gap-2' onClick={handlePrint}>
					<Download className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Download
					</span>
				</Button>

				<Button
					size="lg"
					className='bg-green-700 p-3 text-white mt-4 h-8 gap-2'
					onClick={() => {
						setDisabled(true);
						handleSendInvoice()
					}}
					disabled={disabled}
				>
					<Send className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						{disabled ? "Sending..." : "Send Invoice"}
					</span>
				</Button>
				</div>
			</div>
			
			{bankInfo && customer && invoice && (
				<ComponentToPrint
					ref={componentRef}
					id={id}
					customer={customer}
					bankInfo={bankInfo}
					invoice={invoice}
				/>
			)}
		</Tabs>
	);
}
 */