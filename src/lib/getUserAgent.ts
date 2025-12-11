import { NextRequest } from "next/server";

export function getUserAgent(req: Request | NextRequest): string {
  try {
    if (!req?.headers) return "Unknown";
    let ua =
      req.headers.get("user-agent") ||
      req.headers.get("User-Agent") ||
      "Unknown";

    return sanitizeUA(ua);
  } catch {
    return "Unknown";
  }
}

function sanitizeUA(ua: string): string {
  if (!ua) return "Unknown";


  ua = ua.replace(/[\u0000-\u001F\u007F]+/g, "");

  ua = ua
    .replace(/<|>|"|'/g, "")      
    .replace(/(\r|\n)+/g, "")     
    .replace(/\s{2,}/g, " ");     
  

  if (ua.length > 500) {
    ua = ua.substring(0, 500);
  }

  const blacklist = [
    "javascript:",
    "onerror=",
    "alert(",
    "../",
    "%0d",
    "%0a",
  ];

  for (const bad of blacklist) {
    if (ua.toLowerCase().includes(bad)) {
      return "Suspicious-UA-Blocked";
    }
  }

  return ua.trim() || "Unknown";
}
