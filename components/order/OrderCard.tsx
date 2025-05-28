import { completeOrder } from "@/actions/completeOrder-action"
import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { FormEvent } from "react"
import { mutate } from "swr"

type Prop = {
    order: OrderWithProducts
}
export default function OrderCard({ order }: Prop) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("order_id", order.id.toString())
        await completeOrder(formData)
        mutate("/admin/orders/api")
    }

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente: {order.name}</p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados:</p>
            {order.orderProducts.map(prd => (
                <div
                    key={prd.productId}
                    className="flex items-end gap-2 border-t border-gray-200 pt-4"
                >
                    <dt className="flex items-center text-base text-gray-600">
                        <span className="font-bold">({prd.quantity}) {""}</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{prd.product.name}</dd>
                </div>
            ))}
            <dl className="mt-6 space-y-4">

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            <form onSubmit={handleSubmit}>
                <input type="hidden" value={order.id} name="order_id" />
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-medium cursor-pointer transition-colors"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}