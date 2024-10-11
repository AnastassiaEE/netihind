import { getPosts } from '@/app/lib/wpPosts';
import { Suspense } from 'react';
import PingLoader from '../loaders/PingLoader';
import NothingToPreview from '../NothingToPreview';
import React from 'react';

export const revalidate = 3600;

export default async function BlogCardsWrapper({
    locale,
    children,
}: {
    locale: string;
    children: React.ReactNode;
}) {
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
            {notPosts ? <NothingToPreview message="posts-not-found" /> : childrenWithPosts}
        </Suspense>
    );
}
