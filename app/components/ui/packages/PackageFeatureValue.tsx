import classNames from 'classnames';

export default function PackageFeatureValue({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    const valueClasses = classNames('font-extrabold text-lg uppercase', {
        [className as string]: className !== undefined,
    });
    return <span className={valueClasses}>{children ?? '—'}</span>;
}
