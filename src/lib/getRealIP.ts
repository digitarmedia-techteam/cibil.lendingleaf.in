import { NextRequest } from "next/server";

export function getClientIp(req: NextRequest | { headers: Headers; ip?: string }) {
  if ("ip" in req && req.ip) {
    return req.ip;
  }

  const headers = req.headers;

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0].trim();
    if (ip) return ip;
  }

  // 3. Some proxies send x-real-ip
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;

  return "Unknown";
}
