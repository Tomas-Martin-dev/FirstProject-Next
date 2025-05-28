"use server"

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function completeOrder(formData : FormData) {
    const id = formData.get("order_id")!;
    try {
        await prisma.order.update({
            where: {
                id : +id
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        });
        revalidatePath("/admin/orders") // no funciona porque el cache esta cargado en SWR en este caso
    } catch (error) {
        console.log(error);
    }    
}
