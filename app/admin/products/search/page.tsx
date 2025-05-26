import ProductSearch from '@/components/products/ProductSearch';
import ProductTable from '@/components/products/ProductTable';
import GoBackButton from '@/components/ui/GoBackButton';
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma';
import { ArrowLeftCircleIcon } from '@heroicons/react/16/solid';
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React from 'react'

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive"
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

    let { search } = await searchParams;
    if (search === "cafe") {
        search = "café"
    }

    const products = await searchProducts(search)

    return (
        <>
            <Heading>
                Resultado de busqueda: {search}
            </Heading>

            <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
                <ProductSearch />
                <GoBackButton/>
            </div>

            {products.length ? (<ProductTable products={products} />) : (<p>No hay resultados...</p>)}
        </>
    )
}
