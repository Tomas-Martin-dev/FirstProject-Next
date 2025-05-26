import { prisma } from "@/src/lib/prisma"
import ImagenUpload from "./ImagenUpdate";
import { Product } from "@prisma/client";

async function getCategories() {
    const categories = await prisma.category.findMany();
    return categories
}

type Prop = {
    product? : Product
}
export default async function ProductForm({product}: Prop) {

    const categories = await getCategories();

    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name"
                >Nombre:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Nombre Producto"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="price"
                >Precio:</label>
                <input
                    id="price"
                    name="price"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Precio Producto"
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoryId"
                >Categoría:</label>
                <select
                    className="block w-full p-3 bg-slate-100"
                    id="categoryId"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                    <option disabled>-- Seleccione --</option>
                    {categories.map( cat => (
                        <option key={cat.id} value={cat.id}> {cat.name} </option>
                    ) )}
                </select>
            </div>
            
            <ImagenUpload image={product?.image}/>
        </>
    )
}