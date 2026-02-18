import { getPosts } from '@/app/lib/wpPosts';
import React from 'react';
import { getLocale } from 'next-intl/server';
import NoPostsError from '@/components/ui/errors/NoPostsError';
import { BlogPost } from '@/types/blog.types';

export default async function BlogCardsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const posts: BlogPost[] = await getPosts(locale.toUpperCase());
  console.log(posts);
  if (!posts.length) return <NoPostsError />;
  const childrenWithPosts = React.Children.map(children, (child) => {
    if (React.isValidElement(child))
      return React.cloneElement(child as React.ReactElement<any>, {
        posts: posts,
      });
    return child;
  });
  return <>{childrenWithPosts}</>;
}
