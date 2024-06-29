import { cloneElement } from "react"
import Input from "./Input"

export default function IconInput({
    size = 'sm',
    name,
    type = 'text',
    label,
    placeholder, 
    handleChange, 
    value, 
    handleFocus,
    isValid,
    error,
    icon
}: {
    size?: 'sm' | 'lg',
    name?: string,
    type?: string,
    label?: string,
    placeholder?: string, 
    handleChange?: React.ChangeEventHandler<HTMLInputElement>, 
    value?: string, 
    handleFocus?: React.FocusEventHandler<HTMLInputElement>,
    isValid?: boolean,
    error?: string,
    icon?
}) {

    return (
        <Input
            size={size}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            handleChange={handleChange}
            value={value}
            handleFocus={handleFocus}
            isValid={isValid}
            error={error}
            className={icon.isVisible ? "pl-14": undefined}>
                
            <div className={`absolute h-full flex items-center px-3 ${icon.isVisible ? "block": "hidden"}`}> 
                {cloneElement(
                    icon?.icon, 
                    {
                        className: `${icon?.handleClick ? "cursor-pointer": undefined} rotate-180 transition-all`,
                        onClick: icon?.handleClick,
                    }
                )}
            </div>
        </Input>
    )
}