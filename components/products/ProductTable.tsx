"use client"
import { deleteProduct } from "@/actions/deleteProduct.-action"
import { ProductWithCategory } from "@/app/admin/products/page"
import { formatCurrency } from "@/src/utils"
import Link from "next/link"
import { MouseEvent } from "react"
import { toast } from "react-toastify"
import { id } from "zod/v4/locales"

type Props = {
    products: ProductWithCategory
}
export default function ProductTable({ products }: Props) {
    const handleDelete = async (e: MouseEvent<HTMLButtonElement>)=> {
        const idProduct = +e.currentTarget.value;
        try {
            await deleteProduct(idProduct)
            toast.warning("Producto Eliminado")
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-14 shadow-xs">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Producto
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Categoria
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map(prd => (
                                    <tr key={prd.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {prd.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {formatCurrency(prd.price)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {prd.category.name}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Link
                                                href={`/admin/products/${prd.id}/edit`}
                                                className="text-amber-500 hover:text-amber-600 transition-colors"
                                            >Editar <span className="sr-only">{prd.name}</span></Link>
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button 
                                                type="button"
                                                onClick={(e)=> handleDelete(e)}
                                                value={prd.id}
                                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                            >Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}