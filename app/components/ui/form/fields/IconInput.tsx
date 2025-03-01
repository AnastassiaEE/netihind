import { SvgIconComponent } from '@mui/icons-material';
import Input, { InputSize } from '@/components/ui/form/fields/Input';
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
    icon: { Icon, isVisible, handleClick },
}: {
    size?: InputSize;
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
    value?: string;
    isValid: boolean;
    error?: string;
    icon: { Icon: SvgIconComponent; isVisible: boolean; handleClick?: React.MouseEventHandler };
}) {
    const inputClasses = classNames({
        'pl-10': isVisible && size === 'sm',
        'pl-12': isVisible && size === 'lg',
    });

    const iconWrapperClasses = classNames('absolute flex h-full items-center px-3', isVisible ? 'block' : 'hidden');

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
                {handleClick ? (
                    <button type="button" onClick={handleClick}>
                        <Icon fontSize={size === 'lg' ? 'medium' : 'small'} className="text-muted" />
                    </button>
                ) : (
                    <Icon fontSize={size === 'lg' ? 'medium' : 'small'} className="text-muted" />
                )}
            </div>
        </Input>
    );
}
