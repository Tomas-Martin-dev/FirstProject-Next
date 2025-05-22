"use client"

import { SearchSchemma } from "@/src/schemma"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"

export default function ProductSearch() {
    const router = useRouter();

    const handleSearchForm = (formData : FormData)=> {
        const data = {
            search: formData.get("search")
        }
        const result = SearchSchemma.safeParse(data);
        if (!result.success) {
            result.error.issues.forEach(e => {
                toast.error(e.message)
            });
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }
  
    return (
    <form 
        className="flex items-center gap-0.5"
        action={handleSearchForm}
    >
        <input
            type="text"
            placeholder="Buscar Producto" 
            name="search"
            className="p-2 placeholder-gray-400 w-full bg-white"
        />

        <input 
            type="submit" 
            value="Buscar"
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 uppercase cursor-pointer" 
        />
    </form>
  )
}
