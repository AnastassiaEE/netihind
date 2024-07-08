'use client'

const baseClasses = 'w-full\
 bg-white\
 border\
 rounded-md\
 transition all\
 focus:outline-none\
 focus:shadow-lg\
 focus:shadow-indigo-500/10\
 placeholder: text-grey-300';

const sizes: {[key: string]: string} = {
    sm: 'text-sm px-4 py-2.5',
    lg: 'text-base px-5 py-3'
}

const labelSizes: {[key: string]: string} = {
    sm: 'text-sm mb-1.5',
    lg: 'text-base mb-2.5'
}

export default function Textarea({
    size = 'sm',
    name,
    label,
    placeholder, 
    handleChange, 
    value, 
    isValid,
    error,
    className,
}: {
    size?: 'sm' | 'lg',
    name?: string,
    label?: string,
    placeholder?: string, 
    handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>, 
    value?: string, 
    isValid?: boolean,
    error?: string,
    className?: string,
    
}) {
    const borderColor = !isValid ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500/30';
    
    return (
        <>
            {label && <label htmlFor={name} className={`${labelSizes[size]} font-semibold block`}> {label} </label>}
            <textarea
                className={`${baseClasses} ${sizes[size]} ${borderColor} ${className} ${!isValid ? 'text-red-500': 'text-slate-600'} transition-[padding]`}  
                placeholder={placeholder}
                onChange={handleChange}
                value={value}>
            </textarea>
            {!isValid &&
                <div className={`${size == "sm" ? "text-xs" : "text-sm"} text-red-700 font-medium absolute`}>
                    {error}
                </div>
            }
        </>
    )
}