import React from 'react'
import moment from 'moment'
import Link from 'next/link'


const PostCard = ({ post }) => {
    let postData = post;
    return (
        <div className='bg-white shadow-lg rounded-sm p-0 lg:p-6 pb-12 mb-4'>
            <div className='relative overflow-hidden pb-60 m-4 lg:m-0 lg:mb-8'>
                <img src={postData.featureImage.url} alt={postData.localizations[0].title} className="object-top absolute h-80 w-full object-cover  rounded-t-sm" />
            </div>
            <h1 className='transition duration-300 xl:text-center text-left mb-4 cursor-pointer hover:text-gray-700 text-lg px-4 lg:text-xl font-semibold'>
                <Link href={`/post/${post.slug}`}>
                    {post.localizations[0].title}
                </Link>
            </h1>
            <div className='block lg:flex xl:text-center text-left  item-center justify-center mb-2 w-full'>
                <div className='font-medium text-grey-700  px-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" className=" w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className='text-sm'>
                        {moment(post.createdAt).format("YYYY-MM-DD")}
                    </span>
                </div>
            </div>
            <p className='xl:text-center text-left text-sm text-grey-700 font-normal px-4 mb-8'>
                {post.localizations[0].excerpt}
            </p>
            <div className='text-center'>
                <Link href={`/post/${post.slug}`}>
                    <span className='transition duration-500 transform xl:mb-4 hover:-translate-y-1 inline-block bg-gray-700 xl:text-md text-sm font-medium rounded-md text-white p-6 py-3 cursor-pointer'>
                        Read More...
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default PostCard