import { updateBankInfo, getUserBankInfo } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { accountName, userID, accountNumber, bankName, currency } = await req.json();
	try {
		await updateBankInfo({
			user_id: userID,
            bank_name: bankName,
            account_number: Number(accountNumber),
            account_name: accountName,
            currency: currency,
		});
		return NextResponse.json({ message: "Bank Details Updated!" }, { status: 201 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}

export async function GET(req: NextRequest) {
   const userID  = req.nextUrl.searchParams.get("userID");
    
	try {
		const bankInfo = await getUserBankInfo(userID!);
		return NextResponse.json({ message: "Fetched bank details", bankInfo }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}

/*
import { updateBankInfo, getUserBankInfo } from "@/app/db/actions";
import { NextRequest, NextResponse } from "next/server";

interface BankInfo {
  accountName: string;
  userID: string;
  accountNumber: string;
  bankName: string;
  currency: string;
}

export async function POST(req: NextRequest) {
  const { accountName, userID, accountNumber, bankName, currency }: BankInfo = await req.json();
  
  try {
    await updateBankInfo({
      user_id: userID,
      bank_name: bankName,
      account_number: Number(accountNumber),
      account_name: accountName,
      currency: currency,
    });
    return NextResponse.json({ message: "Bank Details Updated!" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred", err },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const userID = req.nextUrl.searchParams.get("userID");
  
  if (!userID) {
    return NextResponse.json(
      { message: "UserID is required" },
      { status: 400 }
    );
  }
  
  try {
    const bankInfo = await getUserBankInfo(userID);
    return NextResponse.json({ message: "Fetched bank details", bankInfo }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred", err },
      { status: 400 }
    );
  }
}
*/