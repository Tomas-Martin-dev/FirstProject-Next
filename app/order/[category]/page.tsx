import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  const products = prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const products = await getProducts(category);
  
  return (
    <>
      <Heading>
        Elige y personaliza tu pedido
      </Heading>
      <div className="grid grid-cols-1 px-12 sm:px-28 md:px-0 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map ( prd => (
          <ProductCard
            key={prd.id}
            product={prd}
          />
        ))}
      </div>
    </>
  )
}
