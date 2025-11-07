import PostHeaderSection from '@/components/sections/blog-post/PostHeaderSection';
import PostContentSection from '@/components/sections/blog-post/PostContentSection';
import ParallaxBg from '@/components/ui/ParallaxBg';
import { getPostBySlug, getPostsWithSlugsOnly } from '@/app/lib/wpPosts';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import getFormattedSlug from '@/utils/slugFormatter';
import { setRequestLocale } from 'next-intl/server';
import PageLoader from '@/components/ui/loaders/PageLoader';
import { Locale } from 'next-intl';
import RelatedPostsSection from '@/components/sections/blog/RelatedPostsSection';

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
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const params = await props.params;
  const { slug, locale } = params;

  setRequestLocale(locale);

  const post = await getPostBySlug(`${slug}-${locale}`);
  if (!post) notFound();

  return (
    <Suspense fallback={<PageLoader />}>
      <PostHeaderSection title={post.title} date={post.date} />
      <ParallaxBg imgSrc={post.featuredImage.node.sourceUrl} />
      <PostContentSection content={post.content} />
      <RelatedPostsSection />
    </Suspense>
  );
}
