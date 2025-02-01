import classNames from 'classnames';
import { Link } from '@/i18n/routing';

export default function Language({
    href,
    locale,
    current,
}: {
    href: any;
    locale: string;
    current: boolean;
}) {
    const languageClasses = classNames(
        'font-semibold',
        'text-muted-dark',
        'uppercase',
        'hover:text-primary',
        'transition-colors',
        'cursor-pointer',
        'border-b-2',
        {
            'border-primary': current,
            'border-transparent': !current,
        },
    );

    return (
        <Link href={href} locale={locale} className={languageClasses}>
            {locale.toUpperCase()}
        </Link>
    );
}
