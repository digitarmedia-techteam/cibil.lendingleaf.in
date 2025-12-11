export function formatMobile(mobile: string): string {
  // Remove everything except digits
  const cleaned = mobile.replace(/\D/g, "");

  // Always return last 10 digits
  return cleaned.slice(-10);
}
  