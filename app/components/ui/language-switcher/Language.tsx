import classNames from 'classnames';
import Link from 'next/link';

export default function Language({
    lang,
    current,
    href,
    handleClick,
}: {
    lang: string;
    current: boolean;
    href: string;
    handleClick?: React.MouseEventHandler<HTMLSpanElement>;
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
        <Link href={href} lang={lang} onClick={handleClick} className={languageClasses}>
            {lang}
        </Link>
    );
}
