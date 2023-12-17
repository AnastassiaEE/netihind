import styles from '../styles/Input.module.css';
import classNames from 'classnames';

export default function Input({placeholder, handleChange, inputValue, focus}: {placeholder: string, handleChange: Function, inputValue: string, focus: Function}) {

    return (
        <div className="input-group">
            <input 
            type="text" 
            className={classNames(styles['form-control'])}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => focus}
            value={inputValue}/>
        </div>
        
    )
}