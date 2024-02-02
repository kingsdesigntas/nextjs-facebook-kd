import * as v from "valibot"

export const eventSchema = v.object({
  eventName: v.string(),
  eventId: v.optional(v.string()),
  emails: v.optional(v.array(v.nullable(v.string()))),
  phones: v.optional(v.array(v.nullable(v.string()))),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  country: v.optional(v.string()),
  city: v.optional(v.string()),
  zipCode: v.optional(v.string()),
  products: v.optional(
    v.array(
      v.object({
        sku: v.string(),
        quantity: v.number(),
      })
    )
  ),
  value: v.optional(v.number()),
  currency: v.optional(v.string()),
  userAgent: v.string(),
  sourceUrl: v.string(),
  testEventCode: v.optional(v.string()),
  enableStandardPixel: v.optional(v.boolean()),
})

export type PartialWith<T, K extends keyof T> = Partial<T> & Pick<T, K>
export type FacebookClientEvent = v.Input<typeof eventSchema>
export type FacebookServerEvent = PartialWith<
  FacebookClientEvent,
  "eventName"
> & {
  fbp?: string
  fbc?: string
  ipAddress?: string
}
