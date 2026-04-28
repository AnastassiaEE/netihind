import { getPosts } from '@/lib/wordpress/posts';
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

  if (!posts.length) return <NoPostsError />;

  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ posts: BlogPost[] }>,
              {
                posts,
              },
            )
          : child,
      )}
    </>
  );
}
