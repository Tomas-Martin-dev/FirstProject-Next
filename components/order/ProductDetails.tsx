import { useStore } from '@/src/store';
import { OrderItem } from '@/src/types'
import { formatCurrency } from '@/src/utils';
import { MinusIcon, PlusIcon, XCircleIcon } from '@heroicons/react/16/solid';
import React from 'react'

export default function ProductDetails({ item }: { item: OrderItem }) {
    const { decrementar, increase, remove } = useStore();
    return (
        <div className="shadow space-y-1 p-4 bg-white rounded border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                        type="button"
                        onClick={() => {remove(item.id)}}
                    >
                        <XCircleIcon className="text-red-600 hover:text-red-700 transition-colors h-8 w-8 cursor-pointer" />
                    </button>
                </div>
                
                <p className="text-2xl text-amber-500 font-black">
                    {item.price}
                </p>

                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg shadow-xs">
                    <button
                        type="button"
                        onClick={() => {decrementar(item.id)}}
                        disabled={item.quantity === 1}
                        className="disabled:opacity-20 disabled:cursor-default cursor-pointer "
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>

                    <p className="text-lg font-black">
                        {item.quantity}
                    </p>

                    <button
                        type="button"
                        onClick={() => {increase(item.id)}}
                    >
                        <PlusIcon className="h-6 w-6 cursor-pointer" />
                    </button>
                </div>

                <p className="text-xl font-black text-gray-700 ">
                    Subtotal: {''}
                    <span className="font-normal">
                        {formatCurrency(item.subtotal)}
                    </span>
                </p>
            </div>
        </div>
    )
}
