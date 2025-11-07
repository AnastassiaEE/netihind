import BlogSection from '@/components/sections/blog/BlogSection';
import PageLoader from '@/components/ui/loaders/PageLoader';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Suspense, use } from 'react';

export default function Blog(props: { params: Promise<{ locale: Locale }> }) {
  const params = use(props.params);
  const { locale } = params;

  setRequestLocale(locale);

  return (
    <Suspense fallback={<PageLoader />}>
      <BlogSection />
    </Suspense>
  );
}
