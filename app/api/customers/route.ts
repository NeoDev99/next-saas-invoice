import { addCustomer, deleteCustomer, getCustomers, editCustomer } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { userID, customerName, customerEmail, customerAddress } = await req.json();

	try {
		await addCustomer({
			user_id: userID,
			name: customerName,
			email: customerEmail,
			address: customerAddress,
		});
		return NextResponse.json(
			{ message: "New Customer Created!" },
			{ status: 201 }
		);
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
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const customers = await getCustomers(userID);
    return NextResponse.json(
      { message: "Customers retrieved successfully!", customers },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/customers Error:", err);
    return NextResponse.json({ message: "An error occurred while fetching customers" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
	const customerID = req.nextUrl.searchParams.get("id");

	try {
		await deleteCustomer(Number(customerID));
		return NextResponse.json({ message: "Customer deleted!" }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}

export async function PUT(req: NextRequest) {
  const { id, name, email, address } = await req.json();

  if (!id || !name || !email || !address) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await editCustomer(Number(id), { name, email, address });
    return NextResponse.json(
      { message: "Customer updated successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/customers Error:", err);
    return NextResponse.json(
      { message: "An error occurred while updating the customer" },
      { status: 500 }
    );
  }
}
