export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return true;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedStr =
      typeof window !== "undefined" && typeof window.atob === "function"
        ? window.atob(base64)
        : typeof Buffer !== "undefined"
        ? Buffer.from(base64, "base64").toString("binary")
        : "";
    if (!decodedStr) return true;
    const jsonPayload = decodeURIComponent(
      decodedStr
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    if (exp) {
      return Date.now() >= exp * 1000;
    }
    return false;
  } catch (error) {
    return true; // If parsing fails, treat it as expired/invalid
  }
};
