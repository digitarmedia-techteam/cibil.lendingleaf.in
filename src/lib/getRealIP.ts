import { NextRequest } from "next/server";

export function getClientIp(req: Request | NextRequest): string {
  const getHeader = (key: string) => req.headers.get(key);

  // 1️⃣ Cloudflare / True-Client-IP
  const cfIp = getHeader("cf-connecting-ip") || getHeader("true-client-ip");
  if (cfIp && isPublicIp(cfIp)) return sanitizeIp(cfIp);

  // 2️⃣ x-forwarded-for (may have multiple IPs)
  const xff = getHeader("x-forwarded-for");
  if (xff) {
    const ips = xff.split(",").map((ip) => ip.trim());
    for (const ip of ips) {
      if (isPublicIp(ip)) return sanitizeIp(ip);
    }
  }

  // 3️⃣ x-real-ip (Nginx / Apache)
  const realIp = getHeader("x-real-ip");
  if (realIp && isPublicIp(realIp)) return sanitizeIp(realIp);

  // 4️⃣ Direct socket fallback (rare)
  const socket: any = (req as any).socket || (req as any).connection || null;
  let remoteIp = socket?.remoteAddress || null;
  if (remoteIp && isPublicIp(remoteIp)) return sanitizeIp(remoteIp);

  // 5️⃣ Dev fallback
  if (process.env.NODE_ENV === "development") return "127.0.0.1";

  return "0.0.0.0";
}

/* ---------------------------------------------
   🔍 Check if IP is public
----------------------------------------------*/
function isPublicIp(ip: string): boolean {
  if (!ip) return false;
  if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");
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
  return true;
}

/* ---------------------------------------------
   🧼 Remove IPv6 prefix
----------------------------------------------*/
function sanitizeIp(ip: string): string {
  return ip.replace("::ffff:", "");
}
