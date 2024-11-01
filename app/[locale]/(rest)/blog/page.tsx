import ListBlogSection from '@/components/sections/blog/ListBlogSection';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export default function Blog({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    return <ListBlogSection />;
}