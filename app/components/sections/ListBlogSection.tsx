import SectionLayout from "@/layouts/SectionLayout";
import ListBlogCards from "@/components/ui/blog/ListBlogCards";
import posts from "@/data/posts";

export default function ListBlogSection() {
    return (
        <SectionLayout>
            <h1 className="text-4xl font-extrabold mb-10">Blog</h1>
            <ListBlogCards items={posts}></ListBlogCards>
        </SectionLayout>
    )
}