import styles from '../styles/Input.module.css';
import classNames from 'classnames';

export default function Input({
    placeholder, 
    handleChange, 
    inputValue, 
    handleFocus,
    handleBlur
}: {
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    inputValue: string, 
    handleFocus: React.FocusEventHandler<HTMLInputElement>,
    handleBlur: React.FocusEventHandler<HTMLInputElement>}) {

    return (
        <div className="input-group">
            <input 
            type="text" 
            className={classNames(styles['form-control'])}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={inputValue}/>
        </div>
        
    )
}