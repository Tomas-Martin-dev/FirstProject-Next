import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
async function main() {
    try {
        // Seeding agregar datos de forma masiva o de prueba, estos datos se recomiendan que sean lo mas cercano a product
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error);
    }
}
main().then(async ()=> {
    await prisma.$disconnect()
})
.catch(async (e)=> {
    console.log(e);
    await prisma.$disconnect(),
    process.exit(1)
})