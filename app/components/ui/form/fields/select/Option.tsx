import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/styles/styles';

export default function Option({
    value,
    handleClick,
    isSelected,
    size = 'sm',
    className,
    children,
}: {
    value: string;
    handleClick: React.MouseEventHandler<HTMLLIElement>;
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
            onClick={handleClick}
            className={optionClasses}
        >
            {children}
        </li>
    );
}
