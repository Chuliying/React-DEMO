import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'
import { useRouter } from 'next/router'

interface Category {
    name: string
    slug: string
}

const Categories = () => {
    const router = useRouter();
    const { locale } = router;
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories(locale === 'en' ? 'en' : 'zh_TW')
            .then((newCategories) => setCategories(newCategories))
    }, [locale])
    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Categories
            </h3>
            {categories.map((category) =>
            (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className='cursor-pointer block pb-3 mb-3'>
                        {category.name}
                    </span>
                </Link>
            )
            )}
        </div>
    )
}

export default Categories