import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import styles from './KV.module.scss'

const KV = () => {
    const { locale } = useRouter();
    return (
        <div className={`${styles.KV} w-full mb-10 bg-slate-200 h-80 overflow-hidden `}>
            <div className='flex lg:p-10 relative'>
                <div className='flex-1 py-4 px-4 lg:text-left text-center'>
                    <h2 className='text-left'>
                        {
                            locale === 'en' ? 'Title' : '標題'
                        }
                    </h2>
                    <Link href="/Activities">
                        <div className='button'>{
                            locale === 'en' ? 'Action' : '更多'
                        }</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default KV