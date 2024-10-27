import RelatedBlogPostsSection from '@/components/sections/blog/RelatedBlogPostsSection';
import BlogPostContentSection from '@/components/sections/blog-post/BlogPostContentSection';
import BlogPostHeaderSection from '@/components/sections/blog-post/BlogPostHeaderSection';
import ParallaxBg from '@/components/ui/ParallaxBg';
import { getPostsBySlug, getPostsWithSlugsOnly } from '@/app/lib/wpPosts';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PingLoader from '@/components/ui/loaders/PingLoader';
import getFormattedSlug from '@/utils/slugFormatter';

export async function generateStaticParams() {
    // const response = await fetch(`${process.env.BASE_URL}/api/posts`, {
    //     method: 'POST',
    // });
    // const posts = (await response.json()).data.posts.nodes;
    // //console.log(posts)
    // //const posts = await getPostsWithSlugsOnly();
    // //if (posts === undefined) return [];
    // let paths = posts.map((post: { [key: string]: any }) => {
    //     let slug = getFormattedSlug(post.slug);
    //     return {
    //         params: { slug },
    //     };
    // });
    // console.log(paths);
    //return paths;
    return [
        {
            params: { slug: 'millist-internetikiirust-valida-koduseks-kasutamiseks' }
        },
        { params: { slug: 'millised-internetiuhendused-on-olemas' } },
    ]
}

export default async function Post({
    params: { slug, locale },
}: {
    params: { slug: string; locale: string };
}) {
    // const posts = await getPostsBySlug(`${slug}-${locale}`);
    // if (posts === undefined || posts?.length === 0) {
    //     notFound();
    // }
    // const post = posts[0];
    return (
        <Suspense fallback={<PingLoader />}>
            {/* <BlogPostHeaderSection title={post.title} date={post.date} />
            <ParallaxBg imgSrc={post.featuredImage.node.sourceUrl} />
            <BlogPostContentSection content={post.content} />
            <RelatedBlogPostsSection /> */}
            {slug}
        </Suspense>
    );
}
