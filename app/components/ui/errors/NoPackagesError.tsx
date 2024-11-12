import { useTranslations } from 'next-intl';

export default function NoPackagesError() {
    const t = useTranslations('Errors');
    return <p className="text-base">{t('noPackages')}</p>;
}
