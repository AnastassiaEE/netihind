import RelatedBlogPostsSection from '@/components/sections/blog/RelatedBlogPostsSection';
import BlogPostContentSection from '@/components/sections/blog-post/BlogPostContentSection';
import BlogPostHeaderSection from '@/components/sections/blog-post/BlogPostHeaderSection';
import ParallaxBg from '@/components/ui/ParallaxBg';
import { getPostBySlug, getPostsWithSlugsOnly } from '@/app/lib/wpPosts';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import getFormattedSlug from '@/utils/slugFormatter';
import { setRequestLocale } from 'next-intl/server';
import PageLoader from '@/components/ui/loaders/PageLoader';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPostsWithSlugsOnly();
  let paths = posts.map((post: { [key: string]: any }) => {
    let slug = getFormattedSlug(post.slug);
    return {
      slug: slug,
    };
  });
  return paths;
}

export default async function Post(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const params = await props.params;
  const { slug, locale } = params;

  setRequestLocale(locale);

  const post = await getPostBySlug(`${slug}-${locale}`);
  if (!post) notFound();

  return (
    <Suspense fallback={<PageLoader />}>
      <BlogPostHeaderSection title={post.title} date={post.date} />
      <ParallaxBg imgSrc={post.featuredImage.node.sourceUrl} />
      <BlogPostContentSection content={post.content} />
      <RelatedBlogPostsSection />
    </Suspense>
  );
}
