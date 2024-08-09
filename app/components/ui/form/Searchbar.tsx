import useSearcharbar from "../../../hooks/useSearchbar";
import { SvgIconComponent } from "@mui/icons-material"
import DropdownBox from "./DropdownBox";
import IconInput from "./IconInput";
import Input from "./Input";
import React from "react";

export default function Searchbar({
    className,
    data,
    size = 'sm',
    name,
    placeholder, 
    handleChange, 
    handleItemClick,
    value, 
    isValid,
    error,
    icon,
}: {
    className?: string,
    data: string[],
    size?: 'sm' | 'lg', 
    name: string,
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    handleItemClick: React.MouseEventHandler<HTMLAnchorElement>,
    value: string, 
    isValid: boolean,
    error: string,
    icon?: {Icon: SvgIconComponent, isVisible: boolean, handleClick: React.MouseEventHandler}
}) {

    const {isFocused, setFocused, searchBarRef} = useSearcharbar();
    
    return (
        <div className={`${className} relative`} ref={searchBarRef}>
            {icon ?
                <IconInput 
                    size={size}
                    name={name}
                    placeholder={placeholder} 
                    handleChange={handleChange} 
                    handleFocus={setFocused}
                    value={value} 
                    isValid={isValid}
                    error={error}
                    icon={icon}/>
                :
                <Input 
                    size={size}
                    name={name}
                    placeholder={placeholder} 
                    handleChange={handleChange} 
                    handleFocus={setFocused}
                    value={value} 
                    isValid={isValid}
                    error={error}/>
            }
            {isFocused && data.length > 0 && 
                <DropdownBox 
                    searchbar={searchBarRef.current} 
                    data={data} 
                    size={size}
                    handleItemClick={handleItemClick}/>}
        </div>
    )
}