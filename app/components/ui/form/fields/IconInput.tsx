import { SvgIconComponent } from '@mui/icons-material';
import Input from './Input';
import classNames from 'classnames';

export default function IconInput({
    size = 'sm',
    name,
    type = 'text',
    inputmode,
    label,
    placeholder,
    handleChange,
    handleFocus,
    handleBlur,
    value,
    isValid,
    error,
    icon,
}: {
    size?: 'sm' | 'lg';
    name: string;
    type?: string;
    inputmode?:
    | 'email'
    | 'search'
    | 'text'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;
    label?: string;
    placeholder?: string;
    handleChange?: React.ChangeEventHandler<HTMLInputElement>;
    handleFocus?: React.FocusEventHandler<HTMLInputElement>;
    handleBlur?: React.FocusEventHandler<HTMLInputElement>;
    value: string;
    isValid: boolean;
    error?: string;
    icon: { Icon: SvgIconComponent; isVisible: boolean; handleClick?: React.MouseEventHandler };
}) {
    const inputClasses = classNames({
        'pl-10': icon.isVisible && size === 'sm',
        'pl-12': icon.isVisible && size === 'lg',
    });

    const iconWrapperClasses = classNames('absolute h-full flex items-center px-3', {
        block: icon.isVisible,
        hidden: !icon.isVisible,
    });

    const Icon = <icon.Icon fontSize={size === 'lg' ? 'medium' : 'small'} className="text-muted" />;

    return (
        <Input
            size={size}
            name={name}
            type={type}
            inputmode={inputmode}
            label={label}
            placeholder={placeholder}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            value={value}
            isValid={isValid}
            error={error}
            className={inputClasses}
        >
            <div className={iconWrapperClasses}>
                {icon.handleClick ? (
                    <button type="button" onClick={icon.handleClick}>
                        {Icon}
                    </button>
                ) : (
                    <>{Icon}</>
                )}
            </div>
        </Input>
    );
}
