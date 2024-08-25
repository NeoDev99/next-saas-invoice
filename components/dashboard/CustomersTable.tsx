"use client";

import {
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	Table,
	TableCell
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Swal from "sweetalert2";

interface Customer {
	name: string;
	email: string;
	id: number;
	created_at?: string;
}

// Function to format date
const formatDate = (dateString?: string): string => {
	if (!dateString) return 'N/A'; // Return 'N/A' if dateString is undefined or null
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return 'Invalid Date'; // Handle invalid date strings
	const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
	return new Intl.DateTimeFormat('en-GB', options).format(date);
};

export default function CustomersTable({ customers }: { customers: Customer[] }) {

  	const deleteCustomer = async (id: number) => { 
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			});

			if (result.isConfirmed) {
				const request = await fetch(`/api/customers?id=${id}`, {
				  	method: "DELETE",
				});
				const response = await request.json();
		
				Swal.fire("Deleted!", response.message, "success");
			}
		} catch (err) {
			Swal.fire("Error!", "Something went wrong while deleting the customer.", "error");
			console.error(err);
		}
  	}

	const editCustomer = async (id: number) => {
		const newName = prompt("Enter the new name:");
		const newEmail = prompt("Enter the new email:");
		const newAddress = prompt("Enter the new address:");

		if (newName && newEmail && newAddress) {
			try {
				const request = await fetch(`/api/customers`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id,
						name: newName,
						email: newEmail,
						address: newAddress,
					}),
				});
				const response = await request.json();
				alert(response.message);
			} catch (err) {
				console.error(err);
			}
		} else {
			alert("Name, email, and address cannot be empty.");
		}
	}
	  
	return (
		<section>
			<Table>
				<TableHeader>
					<TableRow>
					<TableHead className="hidden w-[100px] sm:table-cell">
						<span className="sr-only">ID</span>
					</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead className="hidden md:table-cell">Created at</TableHead>
					<TableHead>
						<span className="sr-only">Actions</span>
					</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{customers.length > 0 ? (
					customers.map((customer) => (
						<TableRow key={customer.id}>
						<TableCell className="hidden w-[100px] sm:table-cell">
							<span className="sr-only">ID</span>
						</TableCell>
						<TableCell>{customer.name}</TableCell>
						<TableCell>{customer.email}</TableCell>
						<TableCell className="hidden md:table-cell">
							<span>{formatDate(customer.created_at)}</span>
						</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button aria-haspopup="true" size="icon" variant="ghost">
										<MoreHorizontal className="h-4 w-4" />
										<span className="sr-only">Options</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuItem
										onClick={() => editCustomer(customer.id)}
									>
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => deleteCustomer(customer.id)}
									>
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
					))
					) : (
					<TableRow>
						<TableCell colSpan={5} className="text-center">
							No customers found
						</TableCell>
					</TableRow>
					)}
				</TableBody>
			</Table>
		</section>
	);
}
