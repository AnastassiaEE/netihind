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
        'mr-2 size-4 shrink-0 cursor-pointer appearance-none rounded-[.185em] border checked:border-primary checked:bg-primary checked:bg-[url("/images/tick.svg")] checked:bg-contain',
        [sizes[size].checkboxSize],
        {
            'border-valid': isValid,
            'border-invalid': !isValid,
        },
    );
    return (
        <label className="flex cursor-pointer items-center">
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
