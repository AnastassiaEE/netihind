const sizes: {[key: string]: string} = {
    sm: 'text-sm',
    lg: 'text-base'
}

export default function Checkbox({
    name,
    size = 'sm',
    isChecked = false,
    isValid = true,
    handleCheck,
    children
}: {
    name: string,
    size?: 'sm' | 'lg',
    isChecked: boolean,
    isValid?: boolean,
    handleCheck: React.ChangeEventHandler<HTMLInputElement>,
    children: React.ReactNode
}) {
    const borderColor = isValid ? 'border-valid' : 'border-invalid';

    return (
        <div className="flex items-center">
            <input 
                id={name}
                name={name} 
                type="checkbox"
                className={`appearance-none cursor-pointer w-4 h-4 border rounded-[.185em] ${borderColor} checked:bg-primary checked:border-primary checked:bg-[url('/images/tick.svg')] mr-2`}
                checked={isChecked}
                onChange={handleCheck}/>
                <label htmlFor={name} className={`${sizes[size]}`}> {children} </label>
        </div>  
    )
}