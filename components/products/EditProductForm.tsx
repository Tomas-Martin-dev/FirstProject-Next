"use client"
import { formProduct } from "@/src/schemma";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/actions/update-product-action";

export default function EditProductForm({children, id}: {children: React.ReactNode, id: number}) {
    const router = useRouter();

    const handleSubmit = async (fomrData: FormData) => {
        const data = {
            name: fomrData.get("name"),
            price: fomrData.get("price"),
            categoryId: fomrData.get("categoryId"),
            image: fomrData.get("image")
        }
        const result = formProduct.safeParse(data);        
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        const response = await updateProduct(result.data, id)
        if (response?.errors) {
            response.errors.forEach(error => {
                toast.error(error.message)
            })
            return
        }
        toast.success("Producto Actualizado!");
        router.push("/admin/products");
    }
 

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                action={handleSubmit}
                className="space-y-5"
            >
                {children} {/* Ocupo children ya que estoy haciendo "composicion" para poder renderizar un server component(ProductForm) en un clietn component */}

                <input
                    type="submit"
                    value="Guardar Cambios"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-medium rounded cursor-pointer transition"
                />

            </form>
        </div>
    )
}
