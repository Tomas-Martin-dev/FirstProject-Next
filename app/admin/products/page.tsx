import ProductSearch from "@/components/products/ProductSearch";
import ProductsPAgination from "@/components/products/ProductsPAgination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function CountProduct() {
  const count = await prisma.product.count()
  return count
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  });
  return products
}
export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>


export default async function page({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = 10;
  if (page < 0) redirect("/admin/products")
  
  const productsData = getProducts(page, pageSize);
  const countData = CountProduct();
  const [products, productCount] = await Promise.all([productsData, countData])
  
  const totalPages = Math.ceil(productCount / 10);
  if (page > totalPages) redirect("/admin/products")

  return (
    <>
      <Heading>
        Administrar Productos
      </Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-medium cursor-pointer transition-colors hover:bg-amber-500 shadow-sm rounded"
        >Crear Producto
        </Link>

        <ProductSearch/>
      </div>


      {products.length ? (
        <ProductTable products={products}/>
      ) : (
        <p>Ocurrio un error. 
          <span>No hay productos</span>
        </p>
      )}

      <ProductsPAgination page={page} totalPages={totalPages}/>
    </>
  )
}
