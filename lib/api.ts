export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
}

export interface ShortenUrlResponse {
  success: boolean;
  data?: ShortenedUrl;
  error?: string;
}

/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Generates a random short code
 * In production, this should be handled by your backend
 */
function generateShortCode(length: number = 6): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
API CALL
 */
export async function shortenUrl(
  originalUrl: string
): Promise<ShortenUrlResponse> {
  if (!isValidUrl(originalUrl)) {
    return {
      success: false,
      error: "Please enter a valid URL (including http:// or https://)",
    };
  }

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: originalUrl }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error };
    }

    return data;
  } catch {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}


/**
 * Gets URL statistics
 *
 * TODO: Replace with actual API call
 * Example:
 * const response = await fetch(`/api/stats/${shortCode}`);
 * return response.json();
 */
export async function getUrlStats(
  shortCode: string
): Promise<ShortenedUrl | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock response - Replace with actual API call
  return null;
}

/**
 * Redirects to original URL
 *
 * TODO: Implement in your backend route handler
 * This should be a server-side redirect that also increments the click count
 *
 * Example Route Handler (app/[shortCode]/route.ts):
 * export async function GET(request, { params }) {
 *   const { shortCode } = params;
 *   const url = await getOriginalUrl(shortCode);
 *   if (url) {
 *     await incrementClickCount(shortCode);
 *     return redirect(url.originalUrl);
 *   }
 *   return notFound();
 * }
 */
