export function getExtraParams() {
  if (typeof window === "undefined") return null;

  const url = new URL(window.location.href);

  return {
    landing_page: url.pathname + url.search || "",
    utm_content: url.searchParams.get("utm_content") || "",
    utm_source: url.searchParams.get("utm_source") || "",
    utm_medium: url.searchParams.get("utm_medium") || "",
    utm_campaign: url.searchParams.get("utm_campaign") || "",
    sub1: url.searchParams.get("sub1") || "",
    sub2: url.searchParams.get("sub2") || "",
    sub3: url.searchParams.get("sub3") || "",
    sub4: url.searchParams.get("sub4") || "",
  };
}