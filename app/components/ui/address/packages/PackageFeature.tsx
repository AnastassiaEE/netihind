import classNames from 'classnames';

export default function PackageFeature({
    direction = 'row',
    children,
}: {
    direction?: 'row' | 'col';
    children: React.ReactNode;
}) {
    const featureClasses = classNames(
        'flex flex-wrap items-center font-medium uppercase text-muted-dark',
        {
            'flex-row gap-2': direction === 'row',
            'flex-col': direction === 'col',
        },
    );
    return <div className={featureClasses}>{children}</div>;
}
