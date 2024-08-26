"use client";

import React, { useState } from 'react';
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
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Customer {
	name: string;
	email: string;
	id: number;
	created_at?: string;
	address: string;
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
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
	const [newName, setNewName] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [newAddress, setNewAddress] = useState('');

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

	const openEditDialog = (customer: Customer) => {
		setSelectedCustomer(customer);
		setNewName(customer.name);
		setNewEmail(customer.email);
		setNewAddress(customer.address || '');
		setEditDialogOpen(true);
	}

	const handleEditCustomer = async () => {
		if (newName && newEmail && newAddress) {
			try {
				const request = await fetch(`/api/customers`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: selectedCustomer?.id,
						name: newName,
						email: newEmail,
						address: newAddress,
					}),
				});
				const response = await request.json();
				Swal.fire("Updated!", response.message, "success");
				setEditDialogOpen(false);
			} catch (err) {
				Swal.fire("Error!", "Something went wrong while updating the customer.", "error");
				console.error(err);
			}
		} else {
			Swal.fire("Error!", "Name, email, and address cannot be empty.", "error");
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
										onClick={() => openEditDialog(customer)}
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

			{/* Edit Customer Dialog */}
			<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
				<DialogOverlay />
				<DialogContent>
					<DialogTitle className="text-lg font-bold">Edit Customer</DialogTitle>
					<DialogDescription className="mb-4">Update the customer details below.</DialogDescription>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleEditCustomer();
						}}
					>
						<div className="mb-4">
							<label htmlFor="name" className="block text-sm font-medium">Name</label>
							<input
								id="name"
								type="text"
								className="border rounded px-3 py-2 w-full"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium">Email</label>
							<input
								id="email"
								type="email"
								className="border rounded px-3 py-2 w-full"
								value={newEmail}
								onChange={(e) => setNewEmail(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="address" className="block text-sm font-medium">Address</label>
							<input
								id="address"
								type="text"
								className="border rounded px-3 py-2 w-full"
								value={newAddress}
								onChange={(e) => setNewAddress(e.target.value)}
							/>
						</div>
						<div className="flex justify-end">
							<Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" className="ml-2 bg-green-300 hover:bg-green-400 text-white">
								Update
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</section>
	);
}
