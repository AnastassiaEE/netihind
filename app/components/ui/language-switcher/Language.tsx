import classNames from 'classnames';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Language({
    href,
    locale,
    current,
}: {
    href: any;
    locale: string;
    current: boolean;
}) {
    const t = useTranslations('Buttons');

    const languageClasses = classNames(
        'cursor-pointer border-b-2 font-semibold uppercase text-muted-dark transition-colors hover:text-primary',
        current ? 'border-primary' : 'border-transparent',
    );

    return (
        <Link
            href={href}
            locale={locale}
            aria-label={t(`language.${locale}`)}
            aria-current={current ? 'true' : undefined}
            className={languageClasses}
        >
            {locale.toUpperCase()}
        </Link>
    );
}
