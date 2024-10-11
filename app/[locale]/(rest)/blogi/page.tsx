import ListBlogSection from '@/components/sections/blog/list-blog-section/ListBlogSection';

export default function Blog({ params: { locale } }: { params: { locale: string } }) {
    return <ListBlogSection locale={locale} />
}
