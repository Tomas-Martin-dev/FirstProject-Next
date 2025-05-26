"use server"

import { prisma } from "@/src/lib/prisma";
import { formProduct } from "@/src/schemma"
import { error } from "node:console";

export async function crateProduct(data: unknown) {
    const result = formProduct.safeParse(data);
    if (!result.success) {
        return{ errors: result.error.issues }
    }
    await prisma.product.create({
        data: result.data
    })
}