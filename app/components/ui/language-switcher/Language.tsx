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
        'cursor-pointer border-b-2 font-semibold uppercase text-muted-dark transition-colors hover:text-primary',
        current ? 'border-primary' : 'border-transparent',
    );

    return (
        <Link href={href} locale={locale} className={languageClasses}>
            {locale.toUpperCase()}
        </Link>
    );
}
