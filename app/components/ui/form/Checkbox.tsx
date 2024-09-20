import classNames from 'classnames';

const sizes: { [key: string]: string } = {
    sm: 'text-sm',
    lg: '',
};

export default function Checkbox({
    name,
    size = 'sm',
    isChecked = false,
    isValid = true,
    handleCheck,
    children,
}: {
    name: string;
    size?: 'sm' | 'lg';
    isChecked: boolean;
    isValid?: boolean;
    handleCheck: React.ChangeEventHandler<HTMLInputElement>;
    children: React.ReactNode;
}) {
    const checkboxClasses = classNames(
        'appearance-none',
        'cursor-pointer',
        'w-4',
        'h-4',
        'border',
        'rounded-[.185em]',
        'checked:bg-primary',
        'checked:border-primary',
        'checked:bg-[url("/images/tick.svg")]',
        'mr-2',
        {
            'border-valid': isValid,
            'border-invalid': !isValid,
        },
    );

    return (
        <div className="flex items-center">
            <input
                id={name}
                name={name}
                type="checkbox"
                className={checkboxClasses}
                checked={isChecked}
                onChange={handleCheck}
            />
            <label htmlFor={name} className={sizes[size]}>
                {children}
            </label>
        </div>
    );
}
