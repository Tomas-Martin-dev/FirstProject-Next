"use client"

import { Category } from '@prisma/client'
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CategoryIcon({ category }: { category: Category }) {
    const params = useParams<{category: string}>();
    
    return (
        <div 
            className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b
                ${category.slug === params.category ? "bg-amber-300" : ""}`}
        >
            <div className='relative w-16 h-16'>
                <Image src={`/icon_${category.slug}.svg`} alt='imagen-Cat' fill />
            </div>
            <Link className='text-xl font-medium' href={`/order/${category.slug}`}>{category.name}</Link>
        </div>
    )
}
