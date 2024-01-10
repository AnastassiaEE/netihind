import styles from '../styles/Input.module.css';
import classNames from 'classnames';

export default function Input({
    className,
    placeholder, 
    handleChange, 
    inputValue, 
    handleFocus,
    isFeedback,
    feedback
}: {
    className: string,
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
            className={classNames(styles['form-control'], className)}
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