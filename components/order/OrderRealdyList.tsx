import { OrderWithProducts } from '@/src/types'
import { formatTime } from '@/src/utils';
import React from 'react'

export default function OrderRealdyList({order}: {order: OrderWithProducts}) {
console.log('Datos de la orden:', order);
console.log('Tipo de fecha:', typeof order.orderReadyAt);
console.log('Valor de fecha:', order.orderReadyAt);

    return (
    <div className='bg-white shadow p-5 space-y-5 rounded-lg'>
        <div className='flex justify-between items-center'>
            <p className='text-2xl font-semibold text-slate-600'>Cliente: {order.name}</p>
            <p className='font-semibold text-lg text-gray-700'>{formatTime(order.orderReadyAt!)}</p>
        </div>
        <ul
            role='list'
            className='divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'
        >
            {order.orderProducts.map( prod => (
                <li className='flex py-6 text-lg' key={prod.id}>
                    <p>
                        <span className='font-bold text-gray-800'>
                            ({prod.quantity}) {""}
                        </span>
                        {prod.product.name}
                    </p>
                </li>
            ))}
        </ul>
    </div>
  )
}
