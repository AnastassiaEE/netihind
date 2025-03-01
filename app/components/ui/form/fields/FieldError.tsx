import classNames from 'classnames';

export default function FieldError({
    size = 'sm',
    children,
}: {
    size?: 'sm' | 'lg';
    children: React.ReactNode;
}) {
    const errorClasses = classNames('absolute font-medium text-error', {
        'text-xs': size === 'sm',
        'text-sm': size === 'lg',
    });
    return <div className={errorClasses}>{children}</div>;
}
