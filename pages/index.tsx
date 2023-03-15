import React from 'react'
import { PostCard } from '../components'
import { getPosts } from '../services'
import KV from '../components/KV'

interface posts {
    node: {
        author: {
            bio: string
            name: string
            id: string
            photo: {
                url: string
            }
            createdAt: string
        }
        slug: string
        title: string
        createdAt: string
        excerpt: string
        featureImage: {
            url: string
        }
        categories: {
            Category: {
                name: string
                slug: string
            }
        }
    }
}

export default function index(props: { posts: Array<posts> }) {
    const { posts } = props;
    return (
        <>
            <KV />
            <h2 className='text-center text-xl title'>
                Posts
            </h2>
            <div className='container mx-auto px-4 lg:px-10 mb-2 max-w-4xl'>
                <div className='grid grid-cols-1'>
                    <div className='flex flex-col'>
                        {
                            posts.map((post, index) => (
                                <PostCard post={post.node} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export async function getStaticProps({ locale }) {
    const posts = (await getPosts(locale === 'en' ? 'en' : 'zh_TW')) || [];
    posts.reverse();
    return {
        props: { posts }
    }
}