const baseClasses = 'w-full\
 bg-white\
 text-slate-600\
 border\
 rounded-md\
 transition all\
 focus:outline-none\
 focus:drop-shadow-[0_0.5rem_1.125rem_rgba(99,102,241,0.2)]\
 placeholder: text-grey-300';

const sizes: {[key: string]: string} = {
    sm: '',
    lg: 'text-base px-5 py-3'
}

export default function Input({
    size,
    placeholder, 
    handleChange, 
    inputValue, 
    handleFocus,
    isInvalid,
    feedback
}: {
    size: string,
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    inputValue: string, 
    handleFocus: React.FocusEventHandler<HTMLInputElement>,
    isInvalid: boolean,
    feedback: string
}) {

    const borderColor = isInvalid ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500/30';

    return (
        <>
            <input 
                type="text" 
                className={`${baseClasses} ${sizes[size]} ${borderColor}`}  
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={handleFocus}
                value={inputValue}
                />
            {isInvalid &&
                <div className={`${size == "sm" ? "text-xs" : "text-sm"} text-red-700 font-medium static sm:absolute`}>
                    {feedback}
                </div>
            }
        </>
    )
}