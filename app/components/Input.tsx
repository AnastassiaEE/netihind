const baseClasses = 'w-full\
 bg-white\
 text-slate-600\
 border\
 border-gray-300\
 rounded-md\
 transition all\
 focus:border-indigo-500/30\
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
    isFeedback,
    feedback
}: {
    size: string,
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    inputValue: string, 
    handleFocus: React.FocusEventHandler<HTMLInputElement>,
    isFeedback: boolean,
    feedback: string}) {

    return (
        <>
            <input 
                type="text" 
                className={`${baseClasses} ${sizes[size]}`} 
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={handleFocus}
                value={inputValue}/>
            {isFeedback &&
                <div className="invalid-feedback" style={{color: "red"}}>
                    {feedback}
                </div>
            }
        </>
    )
}