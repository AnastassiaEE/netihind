import initTranslations from '@/i18n/i18n';
import ListBlogSection from '@/components/sections/blog/ListBlogSection';

export const revalidate = 3600;

export default async function Blog({ params: { locale } }: { params: { locale: string } }) {
    const { i18n } = await initTranslations(locale, ['blog', 'not-found']);
    return <ListBlogSection i18n={i18n} />;
}