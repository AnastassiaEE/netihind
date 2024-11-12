import ListBlogCard from '@/components/ui/blog/ListBlogCard';

export default function ListBlogCards({ posts }: { posts?: { [key: string]: any }[] }) {
    return (
        <>
            {posts?.map((post) => (
                <div key={post.title} className="[&:not(:last-child)]:mb-6">
                    <ListBlogCard
                        href={post.slug}
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText}
                        date={post.date}
                        title={post.title}
                        excerpt={post.excerpt}
                    />
                </div>
            ))}
        </>
    );
}
