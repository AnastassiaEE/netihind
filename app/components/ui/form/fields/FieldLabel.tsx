import classNames from 'classnames';

const sizes: { sm: string; lg: string } = {
    sm: 'mb-1.5 text-sm',
    lg: 'mb-2.5',
};

export default function FieldLabel({
    htmlFor,
    size = 'sm',
    children,
}: {
    htmlFor: string;
    size?: keyof typeof sizes;
    children: React.ReactNode;
}) {
    const labelClasses = classNames(sizes[size], 'block font-semibold');

    return (
        <label htmlFor={htmlFor} className={labelClasses}>
            {children}
        </label>
    );
}
