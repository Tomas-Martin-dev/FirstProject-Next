import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getPendignOrders() {
  const orders = await prisma.order.findMany({
    where:  {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return orders
}

export default async function OrdersPage() {
  const orders = await getPendignOrders();
  
  return (
    <>
        <Heading>
            Administrar Ordenes
        </Heading>

        {orders.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {orders.map( ord => (
              <OrderCard key={ord.id} order={ord}/>
            ))}
          </div>
        ) : (
          <p className="text-center">No Hay Ordenes Pendientes...</p>
        )}
    </>
  )
}
