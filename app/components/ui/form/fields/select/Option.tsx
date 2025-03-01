import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/styles/styles';

export default function Option({
    value,
    text,
    handleClick,
    isSelected,
    size = 'sm',
    className,
}: {
    value: string;
    text: string;
    handleClick: React.MouseEventHandler<HTMLLIElement>;
    isSelected: boolean;
    size?: keyof typeof sizes;
    className?: string;
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
            {text}
        </li>
    );
}
