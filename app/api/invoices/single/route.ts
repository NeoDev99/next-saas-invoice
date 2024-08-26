import { NextRequest, NextResponse } from "next/server";
import { getSingleInvoice } from "@/db/actions";

export async function GET(req: NextRequest) {
  const invoiceID = req.nextUrl.searchParams.get("id");

  // Check if invoiceID is present and valid
  if (!invoiceID) {
    return NextResponse.json(
      { message: "Invoice ID is required" },
      { status: 400 }
    );
  }

  const invoiceIDNumber = Number(invoiceID);
  if (isNaN(invoiceIDNumber)) {
    return NextResponse.json(
      { message: "Invalid invoice ID" },
      { status: 400 }
    );
  }

  try {
    const invoice = await getSingleInvoice(invoiceIDNumber);
    return NextResponse.json(
      { message: "Invoice retrieved successfully!", invoice },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred", err },
      { status: 500 }
    );
  }
}
