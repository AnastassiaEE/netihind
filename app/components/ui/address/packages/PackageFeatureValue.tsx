import classNames from 'classnames';

export default function PackageFeatureValue({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <span className={classNames('font-extrabold text-lg uppercase', className)}>
            {children ?? '—'}
        </span>
    );
}
