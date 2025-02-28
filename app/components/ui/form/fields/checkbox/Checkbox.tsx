import classNames from 'classnames';

const sizes = {
    sm: { fontSize: 'text-sm', checkboxSize: 'w-4 h-4' },
    lg: { fontSize: 'text-base', checkboxSize: 'w-5 h-5' },
};

export default function Checkbox({
    name,
    value,
    size = 'sm',
    isChecked = false,
    isValid = true,
    handleChange,
    children,
}: {
    name: string;
    value?: string;
    size?: keyof typeof sizes;
    isChecked: boolean;
    isValid?: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    children: React.ReactNode;
}) {
    const checkboxClasses = classNames(
        'appearance-none cursor-pointer w-4 h-4 border rounded-[.185em] mr-2 shrink-0',
        'checked:bg-primary checked:border-primary checked:bg-[url("/images/tick.svg")] checked:bg-contain',
        [sizes[size].checkboxSize],
        {
            'border-valid': isValid,
            'border-invalid': !isValid,
        },
    );

    return (
        <label className="flex items-center cursor-pointer">
            <input
                id={name + value}
                name={name}
                value={value}
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className={checkboxClasses}
            />
            <span className={sizes[size].fontSize}>{children}</span>
        </label>
    );
}
