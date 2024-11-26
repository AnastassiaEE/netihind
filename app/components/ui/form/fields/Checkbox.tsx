import classNames from 'classnames';

const sizes: { sm: string, lg: string } = {
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
    size?: keyof typeof sizes;
    isChecked: boolean;
    isValid?: boolean;
    handleCheck: React.ChangeEventHandler<HTMLInputElement>;
    children: React.ReactNode;
}) {
    const checkboxClasses = classNames(
        'appearance-none cursor-pointer w-4 h-4 border rounded-[.185em] mr-2',
        'checked:bg-primary checked:border-primary checked:bg-[url("/images/tick.svg")]',
        {
            'border-valid': isValid,
            'border-invalid': !isValid,
        }
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
