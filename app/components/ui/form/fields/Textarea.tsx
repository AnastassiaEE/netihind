import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/styles/styles';

export default function Textarea({
    size = 'sm',
    name,
    label,
    placeholder,
    handleChange,
    handleBlur,
    value,
    isValid = true,
    error,
    className,
}: {
    size?: keyof typeof sizes;
    name: string;
    label?: string;
    placeholder?: string;
    handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    handleBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    value?: string;
    isValid?: boolean;
    error?: string;
    className?: string;
}) {
    const textAreaClasses = classNames(
        'placeholder:text-muted w-full rounded-md border bg-white text-muted-dark focus:shadow-lg focus:shadow-indigo-500/10 focus:outline-none',
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
            <textarea
                id={name}
                className={textAreaClasses}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
            ></textarea>
            {!isValid && <FieldError size={size}>{error}</FieldError>}
        </>
    );
}
