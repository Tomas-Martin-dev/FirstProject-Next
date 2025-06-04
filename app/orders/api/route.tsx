import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";
const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

export async function GET() {
    const orders = await prisma.order.findMany({
        take: 4,
        where: {
            orderReadyAt: {
                not: null,
                gte: startOfDay,
                lt: endOfDay
            }
        },
        orderBy: {
            orderReadyAt: "desc"
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return Response.json(orders)
}