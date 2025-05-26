import React from 'react'
import { prisma } from '@/src/lib/prisma';
import CategoryIcon from '../ui/CategoryIcon';
import Logo from '../ui/Logo';


async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSiderbar() {

  const categories = await getCategories()

  return (
    <aside className='lg:w-72 lg:h-screen bg-white'>
      <Logo/>
      
      <nav className='mt-10'>
        {categories.map(cat => (
          <CategoryIcon key={cat.id} category={cat}/>
        ))}
      </nav>
    </aside>
  )
}
