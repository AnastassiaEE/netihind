import PostDate from '@/components/ui/blog/PostDate';
import SectionLayout from '@/layouts/SectionLayout';

export default function BlogPostHeaderSection({ title, date }: { title: string; date: string }) {
    return (
        <SectionLayout className="pb-4">
            <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{title}</h1>
            <div className="mb-4">
                <PostDate date={date} />
            </div>
        </SectionLayout>
    );
}
