import RelatedBlogPostsSection from '@/components/sections/blog/RelatedBlogPostsSection';
import BlogPostContentSection from '@/components/sections/blog-post/BlogPostContentSection';
import BlogPostHeaderSection from '@/components/sections/blog-post/BlogPostHeaderSection';
import ParallaxBg from '@/components/ui/ParallaxBg';
import { getPostBySlug, getPostsWithSlugsOnly } from '@/app/lib/wpPosts';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PingLoader from '@/components/ui/loaders/PingLoader';
import getFormattedSlug from '@/utils/slugFormatter';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export async function generateStaticParams() {
    const posts = await getPostsWithSlugsOnly();
    if (posts === undefined) return [];
    let paths = posts.map((post: { [key: string]: any }) => {
        let slug = getFormattedSlug(post.slug);
        return {
            slug: slug,
        };
    });
    return paths;
}

export default async function Post({
    params: { slug, locale },
}: {
    params: { slug: string; locale: string };
}) {
    setRequestLocale(locale);
    const post = await getPostBySlug(`${slug}-${locale}`);
    if (post === undefined || post === null) {
        notFound();
    }
    return (
        <Suspense fallback={<PingLoader />}>
            <BlogPostHeaderSection title={post.title} date={post.date} />
            <ParallaxBg imgSrc={post.featuredImage.node.sourceUrl} />
            <BlogPostContentSection content={post.content} />
            <RelatedBlogPostsSection />
        </Suspense>
    );
}
