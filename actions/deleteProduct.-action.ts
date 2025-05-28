"use server"

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: number) {
    await prisma.product.delete({
        where: {
            id
        }
    })
    revalidatePath("/admin/products")
}