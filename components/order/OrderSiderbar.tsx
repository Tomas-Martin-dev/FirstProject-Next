import React from 'react'
import { prisma } from '@/src/lib/prisma';
import CategoryIcon from '../ui/CategoryIcon';


async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSiderbar() {

  const categories = await getCategories()

  return (
    <aside className='md:w-72 md:h-screen bg-white'>
      {categories.map(cat => (
        <CategoryIcon key={cat.id} category={cat}/>
      ))}
    </aside>
  )
}
