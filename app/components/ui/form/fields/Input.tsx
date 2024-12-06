import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import classNames from 'classnames';

const baseClasses =
    'w-full bg-white border rounded-md transition-[padding] focus:outline-none focus:shadow-md focus:shadow-primary/10 placeholder:text-muted text-muted-dark';

const sizes: { sm: string; lg: string } = {
    sm: 'text-sm px-4 py-2.5',
    lg: 'px-5 py-3',
};

export type InputSize = keyof typeof sizes;

export default function Input({
    size = 'sm',
    name,
    type = 'text',
    inputmode,
    label,
    placeholder,
    handleChange,
    handleFocus,
    handleBlur,
    value,
    isValid = true,
    error,
    className,
    children,
}: {
    size?: InputSize;
    name: string;
    type?: string;
    inputmode?:
    | 'email'
    | 'search'
    | 'text'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;
    label?: string;
    placeholder?: string;
    handleChange?: React.ChangeEventHandler<HTMLInputElement>;
    handleFocus?: React.FocusEventHandler<HTMLInputElement>;
    handleBlur?: React.FocusEventHandler<HTMLInputElement>;
    value?: string;
    isValid?: boolean;
    error?: string;
    className?: string;
    children?: React.ReactNode;
}) {
    const inputClasses = classNames(baseClasses, sizes[size], className, {
        'border-valid focus:border-primary/30': isValid,
        'border-invalid': !isValid,
    });

    return (
        <>
            {label && (
                <FieldLabel htmlFor={name} size={size}>
                    {label}
                </FieldLabel>
            )}
            <div className="relative">
                {children}
                <input
                    id={name}
                    type={type}
                    inputMode={inputmode}
                    className={inputClasses}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                />
            </div>
            {!isValid && <FieldError size={size}>{error}</FieldError>}
        </>
    );
}
