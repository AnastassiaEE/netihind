import ListBlogSection from '@/components/sections/blog/ListBlogSection';

export default function Blog({ params: { locale } }: { params: { locale: string } }) {
    return <ListBlogSection locale={locale} />
}
