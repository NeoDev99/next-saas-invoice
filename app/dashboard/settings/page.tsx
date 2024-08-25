"use client";

import { useUser } from "@clerk/nextjs";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loading from "@/components/dashboard/Loading";

export default function SettingsPage() {
    const { isLoaded, isSignedIn, user } = useUser();
	const [bankInfo, setBankInfo] = useState({
		account_name: "",
		account_number: 1234567890,
		bank_name: "",
		currency: "",
	});
	const [inputBankInfo, setInputBankInfo] = useState({
		accountName: "",
		accountNumber: 1234567890,
		bankName: "",
		currency: "",
	});

    const fetchBankInfo = useCallback(async () => {
		try {
			const response = await fetch(`/api/bank-info?userID=${user?.id}`);
			const data = await response.json();
			if (data) {
				setBankInfo(data.bankInfo[0]);
			}
		} catch (err) {
			console.error(err);
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			fetchBankInfo();
		}
	}, [user, fetchBankInfo]);

	const handleUpdateBankInfo = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setInputBankInfo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateBankInfo();
	};

	const updateBankInfo = async () => {
		try {
			const response = await fetch("/api/bank-info", {
				method: "POST",
				body: JSON.stringify({ userID: user?.id, ...inputBankInfo }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			if (data) {
				alert(data.message);
			}
			setBankInfo({
				account_name: "",
				account_number: 1234567890,
				bank_name: "",
				currency: "",
			});
		} catch (err) {
			console.error(err);
		}
	};

	if (!isLoaded || !isSignedIn) {
		return < Loading />;
	}


    return (
        <Card>
            <CardHeader>
                <CardTitle>Bank Information</CardTitle>
                <CardDescription>Update your bank account information.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex md:flex-row flex-col items-start justify-between w-full md:space-x-4'>
                    {bankInfo?.account_name && (
                        <section className='md:w-1/3 w-full bg-blue-50 h-full p-3 rounded-md space-y-3'>
                            <p className='text-sm opacity-75'>
                                Account Name: {bankInfo.account_name}
                            </p>
                            <p className='text-sm opacity-75'>
                                Account Number: {bankInfo.account_number}
                            </p>
                            <p className='text-sm opacity-75'>
                                Bank Name: {bankInfo.bank_name}
                            </p>
                            <p className='text-sm opacity-75'>
                                Currency: {bankInfo.currency}
                            </p>
                        </section>
                    )}
                    <form
                        className='md:w-2/3 w-full p-3 flex flex-col'
                        method='POST'
                        onSubmit={handleSubmit}
                    >
                        <Label htmlFor='accountName' className='text-sm'>
                            Account Name
                        </Label>
                        <input
                            type='text'
                            name='accountName'
                            id='accountName'
                            className='border-[1px] p-2 rounded mb-3'
                            required
                            value={inputBankInfo.accountName}
                            onChange={handleUpdateBankInfo}
                        />

                        <Label htmlFor='accountNumber' className='text-sm'>
                            Account Number
                        </Label>
                        <input
                            type='number'
                            name='accountNumber'
                            id='accountNumber'
                            className='border-[1px] p-2 rounded mb-3'
                            required
                            value={inputBankInfo.accountNumber}
                            onChange={handleUpdateBankInfo}
                        />

                        <Label htmlFor='bankName' className='text-sm'>
                            Bank Name
                        </Label>
                        <input
                            type='text'
                            name='bankName'
                            id='bankName'
                            className='border-[1px] p-2 rounded mb-3'
                            required
                            value={inputBankInfo.bankName}
                            onChange={handleUpdateBankInfo}
                        />

                        <Label htmlFor='currency' className='text-sm'>
                            Currency
                        </Label>
                        <select
                            name='currency'
                            id='currency'
                            className='border-[1px] p-2 rounded mb-3'
                            required
                            value={inputBankInfo.currency}
                            onChange={handleUpdateBankInfo}
                        >
                            <option value=''>Select</option>                         
                            <option value='R'>ZAR</option>
                            <option value='$'>USD</option>
                            <option value='€'>EUR</option>
                            <option value='£'>GBP</option>
                        </select>
                        <div className='flex items-center'>
                            <Button
                                type='submit'
                                size='sm'
                                className='bg-gray-900 text-white mt-4'
                            >
                                Update Bank Info
                            </Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};
