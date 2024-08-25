"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import CustomersTable from "@/components/dashboard/CustomersTable";
import Loading from "@/components/dashboard/Loading";

export default function CustomersPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const res = await fetch(`/api/customers?userID=${user?.id}`);
      const data = await res.json();
      setCustomers(data.customers);
      setLoading(false); // Set loading to false after fetching data
    } catch (err) {
      console.error(err);
      setLoading(false); // Set loading to false if there's an error
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCustomers();
    }
  }, [fetchCustomers, user]);

  const createCustomer = async () => {
    setLoading(true);
    try {
      const request = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify({
          userID: user?.id,
          customerName,
          customerEmail,
          customerAddress,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();

      // Use SweetAlert for success feedback
      Swal.fire({
        title: 'Success!',
        text: response.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });

      setCustomerAddress("");
      setCustomerEmail("");
      setCustomerName("");
      setLoading(false);

      // Refresh customer list after adding a new customer
      fetchCustomers();
    } catch (err) {
      console.error(err);

      // Use SweetAlert for error feedback
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while adding the customer.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      
      setLoading(false);
    }
  };

  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCustomer();
  };

  // Use the Loading component when data is loading or user authentication is not completed
  if (!isLoaded || !isSignedIn || loading) {
    return <Loading />;
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Create and view all your customers</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="w-full" onSubmit={handleAddCustomer} method="POST">
            <div className="w-full flex items-center space-x-4 mb-3">
              <div className="w-1/2">
                <Label>Customer&apos;s Name</Label>
                <Input
                  type="text"
                  value={customerName}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="w-1/2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={customerEmail}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerEmail(e.target.value)}
                />
              </div>
            </div>
            <Label htmlFor="address">Billing Address</Label>
            <Textarea
              id="address"
              rows={3}
              value={customerAddress}
              required
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomerAddress(e.target.value)}
            />

            <Button type="submit" disabled={loading} size="sm" className="bg-gray-900 text-white mt-4 h-8 gap-2">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {loading ? "Adding..." : "Add Customer"}
              </span>
            </Button>
          </form>
        </CardContent>
      </Card>

      <CustomersTable customers={customers} />
    </section>
  );
}
