import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Loader } from '../../components';

interface Posts {
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

const CategoryPost = (props: { posts: Array<Posts> }) => {
    const { posts } = props;
    const router = useRouter();
    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto pt-5 lg:px-10 px-4 mb-0">
            <div className="grid grid-cols-1 max-w-4xl mx-auto gap-12">
                <div className='flex flex-col'>
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post.node} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params, locale }) {
    const posts = await getCategoryPost(params.slug, locale === 'en' ? 'en' : 'zh_TW');
    posts.reverse();
    return {
        props: { posts },
    };
}

export async function getStaticPaths({ locale }) {
    const categories = await getCategories(locale === 'en' ? 'en' : 'zh_TW');
    return {
        paths: categories.map(({ slug }) => ({ params: { slug }, locale: 'en' })),
        fallback: true,
    };
}