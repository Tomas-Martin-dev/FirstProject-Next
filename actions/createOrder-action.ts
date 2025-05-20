"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderSchemma } from "@/src/schemma";

export async function createOrder(data: unknown) {
    const result = OrderSchemma.safeParse(data);

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map( prd => ({
                        productId: prd.id,
                        quantity: prd.quantity
                    }))
                }
            }
        })
        console.log("termino el create!!");
    } catch (error) {
        console.log(error);
    }
}