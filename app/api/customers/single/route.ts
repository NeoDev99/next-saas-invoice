import { NextRequest, NextResponse } from "next/server";
import { getSingleCustomer } from "@/db/actions";

export async function GET(req: NextRequest) {
   const customerName = req.nextUrl.searchParams.get("name");

    if (!customerName) {
        return NextResponse.json(
            { message: "Customer name is required" },
            { status: 400 }
        );
    }
    
	try {
		const customer = await getSingleCustomer(customerName!)
        return NextResponse.json(
            { message: "Customer retrieved successfully!", customer },
            { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}

/* 

export async function GET(req: NextRequest) {
  const customerName = req.nextUrl.searchParams.get("name");

  if (!customerName) {
    return NextResponse.json(
      { message: "Customer name is required" },
      { status: 400 }
    );
  }

  try {
    const customer: Customer | null = await getSingleCustomer(customerName);

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Customer retrieved successfully!", customer },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred", error: err.message },
      { status: 500 }
    );
  }
}
*/
