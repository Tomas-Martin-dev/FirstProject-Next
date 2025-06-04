"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client";

export default function AddProducts({product}: {product: Product}) {
    
    const {addToCard} = useStore();;
    
    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 rounded transition-colors text-white w-full mt-5 p-3 uppercase font-medium cursor-pointer"
            onClick={()=> addToCard(product)}
        >Agregar
        </button>
    )
}
