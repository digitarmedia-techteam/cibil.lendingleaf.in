import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db"
import { getClientIp } from "@/lib/getRealIP"
import { checkCibil } from "@/lib/checkCibil"
import { getUserAgent } from "@/lib/getUserAgent"

const allowedIPs: string[] = [
  '122.162.149.197',
];
const allowedPrefixes = [
  '122.162',
  '127.0.0.1'
];

function isAllowed(ip: string): boolean {
  return (
    allowedIPs.includes(ip) ||
    allowedPrefixes.some(prefix => ip.startsWith(prefix))
  );
}


export async function GET(request: NextRequest) {
  const userIp = getClientIp(request);
  if (!isAllowed(userIp)) {
    return NextResponse.json({ status: false, msg: "IP not Whitelist" });
  }
  const [rows] = await pool.query(`SELECT * FROM loan_leads ORDER BY id DESC`);
  return NextResponse.json({ status: false, data: rows });
}

export async function POST(request: NextRequest) {
  try {
    const userIp = getClientIp(request);
    const user_agent = getUserAgent(request);
    const body = await request.json();
    console.log("body : ",body)
    const {
      fullname,
      mobile,
      loanType = "",
      ClickId ="",
      landing_page = "",
      utm_content = "",
      utm_source = "",
      utm_medium = "",
      utm_campaign = "",
      sub1 = "",
      sub2 = "",
      sub3 = "",
      sub4 = ""
    } = body;

    // Validation
    if (!fullname || !mobile) {
      return NextResponse.json(
        { status: false, msg: "Missing required fields: fullname or mobile" },
        { status: 400 }
      );
    }

    if (mobile.length < 10) {
      return NextResponse.json(
        { status: false, msg: "Invalid mobile number format" },
        { status: 400 }
      );
    }  
    const [existingRows]: any = await pool.execute(
      `SELECT cibil_score, remarks FROM loan_leads WHERE fullname = ? AND mobile = ? LIMIT 1`,
      [fullname, mobile]
    );

    if (existingRows.length > 0) {
      return NextResponse.json(
        {
          status: true,
          score: existingRows[0].cibil_score,
          msg :  existingRows[0].remarks
        },
        { status: 200 }
      );
    }

    const [apilimit]: any = await pool.execute(
      `SELECT cibil_score, remarks FROM loan_leads WHERE user_agent = ? AND ip_address = ? AND created_at >= NOW() - INTERVAL 30 DAY`,
      [user_agent, userIp]
    );

    if (apilimit.length == 2) {
      return NextResponse.json(
        {
          status: true,
          score: "",
          msg: "30 Days limit for credit-score checks exceeded."
        },
        { status: 200 }
      );
    }

    const cibil_response: any = await checkCibil({ fullname, mobile});

    const statusCode: string = cibil_response.data?.responseCode ?? "";
    const decentroTxnId: string = cibil_response.data?.decentroTxnId ?? "";
    const remark: string = cibil_response.data?.message ?? "";
    const cibil_score: string = cibil_response?.data?.data?.scoreDetails?.[0]?.value ?? "";
    const loan_type = "cibil";
    
    const sql = `
      INSERT INTO loan_leads (
        fullname, mobile, cibil_score, cibil_response, remarks, loan_type,
        landing_page, utm_content, utm_source, utm_medium, utm_campaign,
        ip_address, user_agent, sub1, sub2, sub3, sub4, statusCode, decentroTxnId, ClickId
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      fullname,
      mobile,
      cibil_score,
      JSON.stringify(cibil_response),   // FIXED ✔
      remark,
      loan_type,
      landing_page,
      utm_content,
      utm_source,
      utm_medium,
      utm_campaign,
      userIp,
      user_agent,
      sub1,
      sub2,
      sub3,
      sub4,
      statusCode,
      decentroTxnId,
      ClickId
    ];

    const [insertScoreDetail]: any = await pool.execute(sql, values);

    return NextResponse.json(
      {
        status: true,
        msg: "Credit Score successfully",
        score: cibil_score
      },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        msg: "Internal server error",
        error: error.message, // show full error
      },
      { status: 500 }
    );
  }
}

