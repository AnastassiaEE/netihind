import classNames from 'classnames';

const sizes: { sm: string; lg: string } = {
    sm: 'text-sm px-4 py-2.5',
    lg: 'px-5 py-3',
};

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
        'text-muted-dark cursor-pointer hover:bg-primary/10',
        {
            'text-primary font-semibold': isSelected,
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
