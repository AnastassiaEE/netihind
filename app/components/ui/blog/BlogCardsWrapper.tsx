import { getPosts } from '@/app/lib/wpPosts';
import { Suspense } from 'react';
import PingLoader from '@/components/ui/loaders/PingLoader';
import NothingToPreview from '@/components/ui/NothingToPreview';
import React from 'react';
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';

export default async function BlogCardsWrapper({ children }: { children: React.ReactNode }) {
    const t = useTranslations('BlogPage');
    const locale = await getLocale();
    const posts = await getPosts(locale.toUpperCase());
    const notPosts = posts === undefined || posts?.length === 0;
    const childrenWithPosts = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement, { posts: posts });
        }
        return child;
    });
    return (
        <Suspense fallback={<PingLoader />}>
            {notPosts ? <NothingToPreview message={t('postsNotFound')} /> : childrenWithPosts}
        </Suspense>
    );
}
