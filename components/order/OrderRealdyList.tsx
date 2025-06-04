"use client"
import { OrderWithProducts } from '@/src/types'
import { formatTime } from '@/src/utils';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

export default function OrderRealdyList({ order }: { order: OrderWithProducts }) {
    const containerID = `scrollContainer-${order.id}`;

    useEffect(() => {
        if (!order?.orderProducts || order.orderProducts.length === 0) return;

        const autoScroll = () => {
            scroll.scrollToBottom({
                containerId: containerID,
                duration: 7000,
                smooth: true,
                delay: 0
            });

            setTimeout(() => {
                scroll.scrollToTop({
                    containerId: containerID,
                    duration: 3000,
                    smooth: true,
                    delay: 0
                });
            }, 7000);
        };

        const initialTimeout = setTimeout(autoScroll, 1000);
        const interval = setInterval(autoScroll, 14000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, [order?.orderProducts, containerID]);

    return (
        <div className='bg-white shadow p-5 space-y-5 rounded-lg'>
            <div className='flex justify-between items-center'>
                <p className='text-2xl font-semibold text-slate-600'>Cliente: {order.name}</p>
                <p className='font-semibold text-lg text-gray-700'>{formatTime(order.orderReadyAt!)}</p>
            </div>

            <div className='overflow-y-auto max-h-60' id={containerID}>
                <ul
                    role='list'
                    className='divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'
                >
                    {order.orderProducts.map(prod => (
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
        </div>
    )
}
