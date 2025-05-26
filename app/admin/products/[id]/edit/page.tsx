import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProductByID(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if (product === null) {
        notFound()
    }
    return product
}


export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductByID(+id)

    return (
        <>
            <Heading>
                Editar Producto: {product.name}
            </Heading>
            
            <GoBackButton/>

            <EditProductForm id={product.id}>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    )
}
