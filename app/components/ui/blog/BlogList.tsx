import ListPostCard from '@/components/ui/blog/ListPostCard';

export default function BlogList({
  posts,
}: {
  posts?: { [key: string]: any }[];
}) {
  return (
    <>
      {posts?.map((post) => (
        <ListPostCard
          key={post.title}
          href={post.slug}
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText}
          date={post.date}
          title={post.title}
          excerpt={post.excerpt}
          className="[&:not(:last-child)]:mb-6"
        />
      ))}
    </>
  );
}
