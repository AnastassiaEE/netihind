import SectionLayout from "@/layouts/SectionLayout";
import Button from "@/components/ui/form/Button";
import Link from "next/link";

export default function RelatedBlogPostsSection() {
    return (
        <SectionLayout className="pb-24">
            <div className="flex justify-end">
                <div className="w-full md:w-44">
                    <Link href="/blog">
                        <Button variant="secondary" size="lg">All Posts →</Button>
                    </Link>
                </div>
            </div>
        </SectionLayout>
    )
}