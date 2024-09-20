import classNames from 'classnames';

export default function Language({
    lang,
    current,
    handleClick,
}: {
    lang: string;
    current: boolean;
    handleClick: React.MouseEventHandler<HTMLSpanElement>;
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
        <span data-lang={lang} onClick={handleClick} className={languageClasses}>
            {lang}
        </span>
    );
}
