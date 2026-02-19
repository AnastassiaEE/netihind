import PostHeaderSection from '@/components/sections/blog-post/PostHeaderSection';
import PostContentSection from '@/components/sections/blog-post/PostContentSection';
import ParallaxBg from '@/components/ui/ParallaxBg';
import { getPostBySlug, getPostsWithSlugsOnly } from '@/app/lib/wpPosts';
import { notFound } from 'next/navigation';
import { Suspense, use } from 'react';
import getFormattedSlug from '@/utils/slugFormatter';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageLoader from '@/components/ui/loaders/PageLoader';
import { Locale, useTranslations } from 'next-intl';
import RelatedPostsSection from '@/components/sections/blog/RelatedPostsSection';
import {
  getPostSchema,
  getMetadata,
  getSchema,
  getWebsiteSchema,
  metadataBaseUrl,
} from '@/utils/seoHelper';
import JsonLd from '@/components/seo/JsonLd';
import { extractFirstTwoSentences } from '@/utils/textFormatter';
import { BlogPost } from '@/types/blog.types';
import { getPageUrl } from '@/utils/urlHelper';

export const dynamic = 'force-static';
export const revalidate = 300;

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const params = await props.params;
  const { slug, locale } = params;

  const post: BlogPost = await getPostBySlug(`${slug}-${locale}`);
  if (!post) return {};

  const t = await getTranslations({ locale, namespace: 'SEO' });

  const title =
    post.title && post.title.trim() !== ''
      ? `${post.title} | Netihind.ee`
      : t('blogPage.title');
  const description =
    extractFirstTwoSentences(post.excerpt ?? '') || t('blogPage.description');
  const url = `${t('blogPage.url')}${slug}/`;
  const image = post.featuredImage?.node?.sourceUrl
    ? [
        {
          url: post.featuredImage.node.sourceUrl,
          width: 1200,
          height: 630,
          alt:
            post.featuredImage.node.altText ??
            post.title ??
            t('blogPage.title'),
        },
      ]
    : undefined;

  return await getMetadata(
    title,
    description,
    'article',
    url,
    t('website.title'),
    locale,
    image,
  );
}

export async function generateStaticParams() {
  const posts: BlogPost[] = await getPostsWithSlugsOnly();
  let paths = posts.map((post: BlogPost) => {
    let slug = getFormattedSlug(post.slug);
    return {
      slug: slug,
    };
  });
  return paths;
}

export default function Post(props: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const params = use(props.params);
  const { slug, locale } = params;

  setRequestLocale(locale);

  const post: BlogPost = use(getPostBySlug(`${slug}-${locale}`));
  if (!post) notFound();

  const t = useTranslations('SEO');

  const title = post.title || t('blogPage.title');
  const description =
    extractFirstTwoSentences(post.excerpt ?? '') || t('blogPage.description');
  const url = `${t('blogPage.url')}${slug}/`;
  const absoluteUrl = getPageUrl(url, metadataBaseUrl);

  const datePublished = post.date;
  const breadcrumbs = [
    { name: t('breadcrumbs.home.name'), url: t('homePage.url') },
    { name: t('breadcrumbs.blog.name'), url: t('blogPage.url') },
    { name: post.title || t('blogPage.title'), url: absoluteUrl },
  ];
  const postGraphItem = getPostSchema(
    title,
    description,
    url,
    datePublished,
    locale,
  );

  return (
    <>
      <JsonLd
        data={getSchema(
          title,
          description,
          url,
          breadcrumbs,
          getWebsiteSchema(t, locale),
          locale,
          [postGraphItem],
        )}
      />
      <Suspense fallback={<PageLoader />}>
        <PostHeaderSection title={post.title ?? ''} date={post.date} />
        <ParallaxBg imgSrc={post.featuredImage?.node.sourceUrl} />
        <PostContentSection content={post.content ?? ''} />
        <RelatedPostsSection />
      </Suspense>
    </>
  );
}
