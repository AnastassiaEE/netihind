import styles from '../styles/Input.module.css';
import classNames from 'classnames';

export default function Input({
    className,
    placeholder, 
    handleChange, 
    inputValue, 
    handleFocus,
}: {
    className: string,
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    inputValue: string, 
    handleFocus: React.FocusEventHandler<HTMLInputElement>}) {

    return (
        <input 
        type="text" 
        className={classNames(styles['form-control'], className)}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        value={inputValue}/>
    )
}