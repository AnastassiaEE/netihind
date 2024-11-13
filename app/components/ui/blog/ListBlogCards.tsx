import ListBlogCard from '@/components/ui/blog/ListBlogCard';

export default function ListBlogCards({ posts }: { posts?: { [key: string]: any }[] }) {
    return (
        <>
            {posts?.map((post) => (
                <ListBlogCard
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
