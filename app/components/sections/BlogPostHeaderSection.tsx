import SectionLayout from '@/layouts/SectionLayout';

export default function BlogPostHeader({ title, date }: { title: string; date: string }) {
    return (
        <SectionLayout className="pb-4">
            <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-8">{title}</h1>
            <time className="block text-muted text-sm mb-4" dateTime={date}>
                {date}
            </time>
        </SectionLayout>
    );
}
