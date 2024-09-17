import ListBlogCard from './ListBlogCard';

export default function ListBlogCards({ items }: { items: { [key: string]: any }[] }) {
    return (
        <>
            {items.map((post) => (
                <div key={post.title} className="[&:not(:last-child)]:mb-6">
                    <ListBlogCard href={post.href} src={post.image} alt={post.alt}>
                        <>{post.date}</>
                        <>{post.title}</>
                        <>{post.entryTitle}</>
                    </ListBlogCard>
                </div>
            ))}
        </>
    );
}
