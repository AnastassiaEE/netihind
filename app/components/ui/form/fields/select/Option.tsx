import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/styles/styles';

export default function Option({
    value,
    handleChange,
    isSelected,
    size = 'sm',
    className,
    children,
}: {
    value: string;
    handleChange?: (value: string) => void;
    isSelected: boolean;
    size?: keyof typeof sizes;
    className?: string;
    children: React.ReactNode;
}) {
    const optionClasses = classNames(
        'cursor-pointer text-muted-dark hover:bg-primary/10',
        {
            'font-semibold text-primary': isSelected,
        },
        sizes[size],
        className,
    );
    return (
        <li
            data-value={value}
            data-selected={isSelected}
            onClick={() => handleChange?.(value)}
            className={optionClasses}
        >
            {children}
        </li>
    );
}
