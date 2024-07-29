import FieldError from "./FieldError";
import FieldLabel from "./FieldLabel";

const baseClasses = 'w-full\
 bg-white\
 border\
 rounded-md\
 transition all\
 focus:outline-none\
 focus:shadow-lg\
 focus:shadow-primary/10\
 placeholder:text-muted';

const sizes: {[key: string]: string} = {
    sm: 'text-sm px-4 py-2.5',
    lg: 'text-base px-5 py-3'
}

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
    isValid,
    error,
    className,
    children,
}: {
    size?: 'sm' | 'lg',
    name: string,
    type?: string,
    inputmode?: "email" | "search" | "text" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined,
    label?: string,
    placeholder?: string, 
    handleChange?: React.ChangeEventHandler<HTMLInputElement>, 
    handleFocus?: React.FocusEventHandler<HTMLInputElement>,
    handleBlur?: React.FocusEventHandler<HTMLInputElement>, 
    value?: string, 
    isValid?: boolean,
    error?: string,
    className?: string,
    children?: React.ReactNode,
}) {
    const borderColor = isValid ? 'border-valid focus:border-primary/30' : 'border-invalid';
    
    return (
        <>
            {label && <FieldLabel htmlFor={name} size={size}>{label}</FieldLabel>}
            <div className="relative">
                {children}
                <input 
                    id={name}
                    type={type} 
                    inputMode={inputmode}
                    className={`${baseClasses} ${sizes[size]} ${borderColor} ${className} text-muted-dark transition-[padding]`}  
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                    />
            </div>
            {!isValid &&<FieldError size={size}>{error}</FieldError>}
        </>
    )
}