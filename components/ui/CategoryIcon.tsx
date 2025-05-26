"use client"

import { Category } from '@prisma/client'
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CategoryIcon({ category }: { category: Category }) {
    const params = useParams<{category: string}>();
    
    return (
        <Link 
            className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b font-medium text-lg ${category.slug === params.category ? "bg-amber-300 hover:bg-amber-300" : ""} hover:bg-amber-100 transition-colors`}
            href={`/order/${category.slug}`}
        >
            <div className='relative w-16 h-16'>
                <Image src={`/icon_${category.slug}.svg`} alt='imagen-Cat' fill />
            </div>
            {category.name}
        </Link>
    )
}
