import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, mobile } = await req.json();

    // Basic Validation
    if (!name || !mobile) {
      return NextResponse.json(
        { status: "FAILED", message: "Name and mobile are required" },
        { status: 400 }
      );
    }

    // Mobile validation (Decentro requirement)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return NextResponse.json(
        { status: "FAILED", message: "Invalid mobile number" },
        { status: 400 }
      );
    }

    // Call Decentro API
    const response = await fetch(
      "https://in.decentro.tech/v2/bytes/credit-score",
      {
        method: "POST",
        headers: {
          "client-id": process.env.DECENTRO_CLIENT_ID || "",
          "client-secret": process.env.DECENTRO_CLIENT_SECRET || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, mobile }),
      }
    );

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Credit Score Error:", error);
    return NextResponse.json(
      { status: "FAILED", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
