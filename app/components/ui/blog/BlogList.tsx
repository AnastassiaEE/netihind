import ListPostCard from '@/components/ui/blog/ListPostCard';
import { BlogPost } from '@/types/blog.types';

export default function BlogList({ posts }: { posts?: BlogPost[] }) {
  return (
    <>
      {posts?.map((post, index) => (
        <ListPostCard
          key={`${post.title}-${index}`}
          href={post.slug}
          imgSrc={post.featuredImage?.node.sourceUrl}
          alt={post.featuredImage?.node.altText ?? ''}
          date={post.date}
          title={post.title ?? ''}
          excerpt={post.excerpt ?? ''}
          className="not-last:mb-6"
        />
      ))}
    </>
  );
}
