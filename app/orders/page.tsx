"use client"
import OrderRealdyList from '@/components/order/OrderRealdyList';
import Logo from '@/components/ui/Logo'
import { OrderWithProducts } from '@/src/types';
import React from 'react'
import useSWR from 'swr';
import Clock from '@/components/ui/Clock';

export default function pageOrdersReady() {
    const url = "/orders/api";
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, isLoading, error } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 10000
    })
    
    if (isLoading) {
        <p>Cargando Ordenes...</p>
    }

    if (error) {
        <p>Error en carga de datos</p>
    }

    if (data) return (
        <div className='min-h-screen'>
            <div className='max-w-5xl mx-auto flex justify-between items-end'>
                <div className='-mb-3.5'>
                    <Logo/>
                </div>
                <Clock showSeconds={true} showDate={true} size='lg' variant='minimal' className='mt-0 text-center'/>
            </div>
            <h1 className='text-center mt-4 text-5xl font-bold'> Ordenes Listas </h1>

            {data.length ? (
                <div className='grid grid-cols-2 gap-5 max-w-5xl mx-auto my-8'>
                    {data.map(order => (
                        <OrderRealdyList key={order.id} order={order}/>
                    ))}
                </div>
            ) : (
                <p className='text-center my-10 font-semibold'>Preparando Ordenes</p>
            )}
        </div>
    )
}
