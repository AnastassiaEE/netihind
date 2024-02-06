'use client'

const baseClasses = 'w-full\
 bg-white\
 text-slate-600\
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

export default function Input({
    size,
    name,
    type = 'text',
    label,
    placeholder, 
    handleChange, 
    value, 
    handleFocus,
    isInvalid,
    error
}: {
    size: string,
    name: string,
    type?: string,
    label?: string,
    placeholder?: string, 
    handleChange?: React.ChangeEventHandler<HTMLInputElement>, 
    value?: string, 
    handleFocus?: React.FocusEventHandler<HTMLInputElement>,
    isInvalid: boolean,
    error: string
}) {

    const borderColor = isInvalid ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500/30';

    return (
        <>
            {label && <label htmlFor={name} className={`${labelSizes[size]} font-semibold block`}> {label} </label>}
            <input 
                type={type} 
                className={`${baseClasses} ${sizes[size]} ${borderColor}`}  
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={handleFocus}
                value={value}
                />
            {isInvalid &&
                <div className={`${size == "sm" ? "text-xs" : "text-sm"} text-red-700 font-medium static sm:absolute`}>
                    {error}
                </div>
            }
        </>
    )
}