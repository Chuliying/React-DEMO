import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getCategories } from '../services'
import Hamburger from './Hamburger'

interface Category {
    name: string
    slug: string
}

const Header = () => {
    const { locale } = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories(locale === 'en' ? 'en' : 'zh_TW')
            .then((newCategories: Category[]) => setCategories(newCategories))
    }, [locale])



    const [menuState, setMenuState] = useState(false);
    const menuToggle = (): void => {
        if (window.innerWidth <= 768) {
            setMenuState(!menuState);
        }
    }

    return (
        <div className=' w-full px-4 py-2 top-0 mb-8 header fixed z-40'>
            <div className=' w-full flex'>
                <div className='md:float-left block flex-1'>
                    <Link href="/">
                        <Image className='lg:h-10 h-6 w-auto' src={require('../public/images/logo-w.png')} alt="DEMO" />
                    </Link>
                </div>
                <div className={`${menuState ? '' : 'hidden'}  md:contents menu`}>
                    <ul className='flex items-center' onClick={() => menuToggle()}>
                        <li className='inline-block  text-white py-3 px-3 font-semibold cursor-pointer'>
                            <Link href='/About'>
                                {locale === 'en' ? 'About' : '關於我們'}
                            </Link>
                        </li>
                        <li className='inline-block text-white py-3 px-3 font-semibold cursor-pointer'>
                            <Link href='/Activities'>
                                {locale === 'en' ? 'Activities' : '活動'}
                            </Link>
                        </li>
                        {categories.map((category) => (
                            <li key={category.slug} className=' inline-block text-white py-3 px-3 font-semibold cursor-pointer'>
                                <Link href={`/category/${category.slug}`}>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                        <li
                            className=' text-white py-3 px-3 font-semibold cursor-pointer'
                        >
                            <Link href="/" locale={locale === 'en' ? 'zh-TW' : 'en'}>
                                {locale === 'en' ? '中文' : 'Eng'}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div onClick={() => menuToggle()} className='sm:hidden'>
                    <Hamburger menuState={menuState} />
                </div>
            </div>
        </div >
    )
}

export default Header
