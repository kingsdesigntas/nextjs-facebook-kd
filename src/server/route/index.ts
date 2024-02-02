import { NextRequest, NextResponse } from "next/server"
import * as v from "valibot"
import { eventSchema } from "../../types"
import { sendServerSideEvent } from "../api/event"
import { getClientFbc, getClientFbp, getClientIpAddress } from "./utils"

/**
 * Facebook Conversion API Event Handler for Next.js API Routes.
 *
 * @param request
 * @constructor
 */
export const POST = async (request: NextRequest) => {
  const data = await request.json()
  try {
    const body = v.parse(eventSchema, data)

    const {
      eventName,
      eventId,
      emails,
      phones,
      firstName,
      lastName,
      country,
      city,
      zipCode,
      products,
      value,
      currency,
      userAgent,
      sourceUrl,
      testEventCode,
    } = body

    if (!eventName) {
      return NextResponse.json(
        { error: "Event name is required" },
        { status: 400 }
      )
    }

    const payload = {
      eventName,
      eventId,
      emails,
      phones,
      firstName,
      lastName,
      country,
      city,
      zipCode,
      products,
      value,
      currency,
      fbp: getClientFbp(request),
      fbc: getClientFbc(request),
      ipAddress: getClientIpAddress(request),
      userAgent,
      sourceUrl,
      testEventCode,
    }

    const response = await sendServerSideEvent(payload)
    const success = response?.events_received === 1 ?? false

    if (process.env.NEXT_PUBLIC_FB_DEBUG === "true") {
      return NextResponse.json(
        {
          debug: true,
          success,
          payload,
          response,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
