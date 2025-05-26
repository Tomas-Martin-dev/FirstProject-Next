"use server"

import { prisma } from "@/src/lib/prisma";
import { formProduct } from "@/src/schemma";
import { revalidatePath } from "next/cache";

export async function updateProduct(data: unknown, id: number) {
    const result = formProduct.safeParse(data);
    if (!result.success) {
        return { errors: result.error.issues }
    }
    await prisma.product.update({
        where:{
            id
        },
        data: result.data
    })
    revalidatePath("/admin/products");
}