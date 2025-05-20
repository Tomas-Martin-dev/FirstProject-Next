import { z } from "zod"

export const OrderSchemma = z.object({
    name: z.string().min(2, "Tu nombre es obligatorio"),
    total: z.number().min(1, "Hay errores en la orden"),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number(),
    }))
})