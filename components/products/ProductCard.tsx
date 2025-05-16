import { formatCurrency } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProducts from "./AddProducts";

export default function ProductCard({product}: {product: Product}) {
  return (
    <div className="border bg-white">
        <Image src={`/products/${product.image}.jpg`} alt={`Imagen ${product.name}`} width={500} height={400}/>
        
        <div className="p-5 w-full">
            <h3 className="text-2xl font-medium">{product.name}</h3>
            <p className="text-xl font-bold text-amber-500">{formatCurrency(product.price)}</p>
            <AddProducts product={product}/>
        </div>
    </div>
  )
}
