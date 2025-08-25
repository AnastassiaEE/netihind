import ListBlogSection from '@/components/sections/blog/ListBlogSection';
import PageLoader from '@/components/ui/loaders/PageLoader';
import { setRequestLocale } from 'next-intl/server';

import { Suspense, use } from 'react';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function Blog(props: { params: Promise<{ locale: string }> }) {
  const params = use(props.params);
  const { locale } = params;

  setRequestLocale(locale);

  return (
    <Suspense fallback={<PageLoader />}>
      <ListBlogSection />
    </Suspense>
  );
}
