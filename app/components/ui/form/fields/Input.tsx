import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/styles/styles';

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
    const inputClasses = classNames(
        'w-full rounded-md border bg-white text-muted-dark transition-[padding] placeholder:text-muted focus:shadow-md focus:shadow-primary/10 focus:outline-none',
        sizes[size],
        isValid ? 'border-valid focus:border-primary/30' : 'border-invalid',
        className,
    );

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
