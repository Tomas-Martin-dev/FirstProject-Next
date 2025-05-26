import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function page() {
  return (
    <>
      <Heading>
        Nuevo Producto
      </Heading>

      <GoBackButton/>
      
      <AddProductForm>
        <ProductForm /> {/* Ocupo esta sintaxis de children ya que estoy haciendo "composicion" para poder renderizar un server component(ProductForm) en un clietn component */}
      </AddProductForm>
    </>
  )
}
