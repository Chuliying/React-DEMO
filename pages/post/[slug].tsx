import React from 'react'
import { useRouter } from 'next/router';
import { getPosts, getPostDetails } from '../../services'
import { PostDetail, Loader } from '../../components'
interface Post {
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
    categories: Array<Category>

    content: {
        raw: any
    }
}

interface Category {
    name: string
    slug: string
}

const PostDetails = (props: { post: Post }) => {
    const { post } = props;
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }
    return (
        <div className='container mx-auto pt-1 lg:pt-10 px-0  lg:px-8 lg:mb-6'>
            <div className='grid grid-cols-1'>
                <div className='col-span-1'>
                    <PostDetail post={post} />
                </div>
            </div>
        </div>
    )
}

export default PostDetails

export async function getStaticProps({ params, locale }) {
    const data = await getPostDetails(params.slug, locale === 'en' ? 'en' : 'zh_TW');
    return {
        props: { post: data }
    }
}

export async function getStaticPaths({ locale }) {
    const posts = await getPosts(locale === 'en' ? 'en' : 'zh_TW');
    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug }, locale: 'en' })),
        fallback: true,
    }
}