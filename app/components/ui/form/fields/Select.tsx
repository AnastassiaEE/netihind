import classNames from 'classnames';
import FieldLabel from '../FieldLabel';

const baseClasses = classNames(
    'w-full',
    'bg-white',
    'border',
    'rounded-md',
    'focus:outline-none',
    'focus:shadow-lg',
    'focus:shadow-primary/10',
    'placeholder:text-muted',
    'text-muted-dark',
);

const sizes: { [key: string]: string } = {
    sm: 'text-sm px-4 py-2.5',
    lg: 'px-5 py-3',
};

export default function Select({
    size = 'sm',
    name,
    label,
    handleChange,
    value,
    className,
    children,
}: {
    size?: 'sm' | 'lg';
    name: string;
    label?: string;
    handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
    value: string;
    className?: string;
    children: React.ReactNode;
}) {
    const selectClasses = classNames(baseClasses, sizes[size], {
        [className as string]: className !== undefined,
    });

    return (
        <>
            {label && (
                <FieldLabel htmlFor={name} size={size}>
                    {label}
                </FieldLabel>
            )}
            <select name={name} id={name} onChange={handleChange} value={value} className={selectClasses}>
                {children}
            </select>
        </>
    );
}
