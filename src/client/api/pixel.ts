import { FacebookClientEvent } from "../../types"
import { fbEvent } from "./event"

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

export const pageview = () => {
  fbEvent({
    eventName: "PageView",
    enableStandardPixel: true,
  })
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (
  eventName: string,
  options?: Partial<Omit<FacebookClientEvent, "eventName">>
) => {
  fbEvent({
    ...options,
    eventName,
    enableStandardPixel: true,
  })
}
