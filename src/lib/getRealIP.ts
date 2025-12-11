import { NextRequest } from "next/server";

export function getClientIp(req: Request | NextRequest): string {
  try {
    const getHeader = (key: string) => req.headers.get(key);

    // 1️⃣ Vercel Edge / Cloudflare Workers / Next Middleware
    const edgeIp = (req as any).ip;
    if (edgeIp && isPublicIp(edgeIp)) return sanitizeIp(edgeIp);

    // 2️⃣ Cloudflare IP headers
    const cfIp = getHeader("cf-connecting-ip") || getHeader("true-client-ip");
    if (cfIp && isPublicIp(cfIp)) return sanitizeIp(cfIp);

    // 3️⃣ Reverse Proxies → AWS ALB/ELB, Nginx, CloudFront
    const xff = getHeader("x-forwarded-for");
    if (xff) {
      // x-forwarded-for may contain: "client, proxy1, proxy2"
      const parts = xff.split(",").map((ip) => ip.trim());
      for (const ip of parts) {
        if (isPublicIp(ip)) return sanitizeIp(ip);
      }
    }

    // 4️⃣ Nginx / Apache
    const realIp = getHeader("x-real-ip");
    if (realIp && isPublicIp(realIp)) return sanitizeIp(realIp);

    // 5️⃣ Self-hosted Node.js → direct TCP connection
    const socket =
      (req as any).socket ||
      (req as any).connection ||
      (req as any).info ||
      null;

    let raw = socket?.remoteAddress || null;

    if (raw) {
      if (raw.startsWith("::ffff:")) raw = raw.replace("::ffff:", "");
      if (isPublicIp(raw)) return sanitizeIp(raw);
    }

    // 6️⃣ Dev mode fallback
    if (process.env.NODE_ENV === "development") {
      return "127.0.0.1";
    }

    return "0.0.0.0";
  } catch {
    return "0.0.0.0";
  }
}

/* ---------------------------------------------
   🔍 Public IP Validator
----------------------------------------------*/
function isPublicIp(ip: string): boolean {
  if (!ip) return false;

  // Remove IPv6 prefix
  if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");

  // Reject private ranges
  const privateRanges = [
    /^10\./,
    /^127\./,
    /^192\.168\./,
    /^172\.(1[6-9]|2\d|3[0-1])\./,
    /^::1$/,
    /^fc00:/,
    /^fe80:/,
  ];

  if (privateRanges.some((r) => r.test(ip))) return false;

  // IPv4
  const ipv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (ipv4.test(ip)) return true;

  // IPv6
  const ipv6 =
    /^(([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4})$/;

  return ipv6.test(ip);
}

/* ---------------------------------------------
   🧼 Remove IPv6 prefix
----------------------------------------------*/
function sanitizeIp(ip: string): string {
  return ip.replace("::ffff:", "");
}
