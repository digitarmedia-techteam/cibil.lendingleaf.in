// lib/checkCibil.ts
import { formatMobile } from "./formatMobile";

export interface CibilRequest {
  fullname: string;
  mobile: string;
}

export interface CibilResponse {
  success: boolean;
  statusCode: number,
  data: any;
  error?: string;
}

interface CibilPayload {
  name: string;
  mobile: string;
}


export async function checkCibil({ fullname, mobile }: CibilRequest): Promise<CibilResponse> {
  try {
    const formattedMobile = formatMobile(mobile);

    const payload: CibilPayload = {
      name: fullname,
      mobile: "91"+formattedMobile,
    };
    console.log(payload)
    const response = await fetch("https://in.decentro.tech/v2/bytes/credit-score", {
      method: "POST",
      headers: {
        accept: "application/json",
        client_id: process.env.DECENTRO_CLIENT_ID ?? "",
        client_secret: process.env.DECENTRO_CLIENT_SECRET ?? "",
        "content-type": "application/json",
      },
    });
    const statusCode = response.status;
    const result = await response.json();

    return {
      success: true,
      statusCode,
      data: result,
    };

  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      data: null,
      error: error?.message || "Failed to check CIBIL",
    };
  }
}

