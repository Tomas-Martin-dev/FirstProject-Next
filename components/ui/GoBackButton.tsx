"use client"
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBackButton() {
    const router = useRouter();

    return (
        <button
            onClick={()=> router.back()}
            className="flex gap-1 items-center -mt-6 cursor-pointer"
        >
            <ArrowLongLeftIcon width={20} />
            Todos los Productos
        </button>
    )
}
