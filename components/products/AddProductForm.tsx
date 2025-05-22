"use client"
import ProductForm from "./ProductForm";

export default function AddProductForm() {

    const handleSubmit = async (fomrData: FormData) => {
        console.log(FormData);
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                action={handleSubmit}
                className="space-y-5"
            >
                <ProductForm />

                <input
                    type="submit"
                    value="Registrar Producto"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-medium cursor-pointer"
                />

            </form>
        </div>
    )
}
