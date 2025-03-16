import ListBlogSection from '@/components/sections/blog/ListBlogSection';
import PageLoader from '@/components/ui/loaders/PageLoader';
import { setRequestLocale } from 'next-intl/server';

import { Suspense } from 'react';

export const revalidate = 3600;

export default function Blog({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <Suspense fallback={<PageLoader />}>
      <ListBlogSection />
    </Suspense>
  );
}
