import RelatedBlogPostsSection from '@/components/sections/blog/RelatedBlogPostsSection';
import BlogPostContentSection from '@/components/sections/blog-post/BlogPostContentSection';
import BlogPostHeaderSection from '@/components/sections/blog-post/BlogPostHeaderSection';
import ParallaxBg from '@/components/ui/ParallaxBg';
import { getPosts, getPostsBySlug } from '@/app/lib/wpPosts';
import i18nConfig from '@/i18nConfig';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PingLoader from '@/components/ui/loaders/PingLoader';
import getFormattedDate from '@/utils/dateFormatter';

export const revalidate = 3600;

export async function generateStaticParams() {
    const posts = await getPosts();
    const paths = posts.map((post: { [key: string]: any }) => {
        let slug = post.slug;
        i18nConfig.locales.forEach((locale) => {
            slug = slug.replace(new RegExp(`-${locale}$`, 'g'), '');
        });
        return {
            params: { slug },
        };
    });
    return paths;
}

export default async function Post({
    params: { slug, locale },
}: {
    params: { slug: string; locale: string };
}) {
    const posts = await getPostsBySlug(`${slug}-${locale}`);
    if (posts === undefined || posts?.length === 0) {
        notFound();
    }
    const post = posts[0];
    return (
        <Suspense fallback={<PingLoader />}>
            <BlogPostHeaderSection title={post.title} date={getFormattedDate(post.date)} />
            <ParallaxBg imgSrc={post.featuredImage.node.sourceUrl} />
            <BlogPostContentSection content={post.content} />
            <RelatedBlogPostsSection />
        </Suspense>
    );
}
