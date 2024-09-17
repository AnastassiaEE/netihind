import FieldError from "./FieldError";
import FieldLabel from "./FieldLabel";
import classNames from "classnames";

const baseClasses = classNames(
    'w-full',
    'bg-white',
    'border',
    'rounded-md',
    'text-muted-dark',
    'transition-[padding]',
    'transition all',
    'focus:outline-none',
    'focus:shadow-lg',
    'focus:shadow-indigo-500/10',
    'placeholder: text-grey-300'
)

const sizes: {[key: string]: string} = {
    sm: 'text-sm px-4 py-2.5',
    lg: 'text-base px-5 py-3'
}

export default function Textarea({
    size = 'sm',
    name,
    label,
    placeholder, 
    handleChange, 
    handleBlur,
    value, 
    isValid,
    error,
    className,
}: {
    size?: 'sm' | 'lg',
    name: string,
    label?: string,
    placeholder?: string, 
    handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>, 
    handleBlur?: React.FocusEventHandler<HTMLTextAreaElement>
    value?: string, 
    isValid?: boolean,
    error?: string,
    className?: string,
}) {

    const textAreaClasses = classNames(baseClasses, sizes[size], {
        'border-valid focus:border-primary/30': isValid,
        'border-invalid': !isValid,
        [className as string]: className !== undefined
    })
    
    return (
        <>
            {label && <FieldLabel htmlFor={name} size={size}> {label} </FieldLabel>}
            <textarea
                id={name}
                className={textAreaClasses}  
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}>
            </textarea>
            {!isValid &&<FieldError size={size}>{error}</FieldError>}
        </>
    )
}