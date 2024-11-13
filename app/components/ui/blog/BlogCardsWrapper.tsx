import { getPosts } from '@/app/lib/wpPosts';
import React from 'react';
import { getLocale } from 'next-intl/server';
import NoPostsError from '@/components/ui/errors/NoPostsError';

export default async function BlogCardsWrapper({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const posts = await getPosts(locale.toUpperCase());
    const notPosts = posts === undefined || posts?.length === 0;
    if (notPosts) return <NoPostsError />;
    const childrenWithPosts = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement, { posts: posts });
        }
        return child;
    });
    return <>{childrenWithPosts}</>;
}
