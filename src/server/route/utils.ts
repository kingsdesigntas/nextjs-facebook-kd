import { cookies } from "next/headers"
import { NextRequest } from "next/server"

/**
 * Get client IP address from request.
 *
 * @param req
 */
const getClientIpAddress = (req: NextRequest): string => {
  const ipAddress = req.headers.get("x-real-ip")

  if (ipAddress) {
    return String(ipAddress)
  }

  const xForwardedFor = req.headers.get("x-forwarded-for") ?? ""

  return xForwardedFor.split(",")[0]
}
/**
 * Get client user agent from request.
 *
 * @param req
 */
const getClientUserAgent = (req: NextRequest): string =>
  String(req.headers.get("user-agent") ?? "")
/**
 * Get client fbp from request cookie.
 *
 * @param req
 */
const getClientFbp = (req: NextRequest): string => {
  const cookieStore = cookies()

  const fbp = cookieStore.get("_fbp")?.value

  if (!fbp) {
    return ""
  }

  return fbp
}
/**
 * Get client fbc from request query params or cookie.
 *
 * @param req
 */
const getClientFbc = (req: NextRequest): string => {
  const referer = req.headers.get("referer")
  if (referer) {
    const url = new URL(referer)

    if (url.searchParams.has("fbclid")) {
      return url.searchParams.get("fbclid") ?? ""
    }
  }

  const cookieStore = cookies()
  const fbc = cookieStore.get("_fbc")?.value
  if (fbc) {
    return fbc
  }

  return ""
}

export { getClientFbc, getClientFbp, getClientIpAddress, getClientUserAgent }
