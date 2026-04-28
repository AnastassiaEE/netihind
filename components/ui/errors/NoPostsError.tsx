import { useTranslations } from 'next-intl';

export default function NoPostsError() {
    const t = useTranslations('Errors');
    return <p className="text-base">{t('noPosts')}</p>;
}