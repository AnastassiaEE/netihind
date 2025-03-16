import { SvgIconComponent } from '@mui/icons-material';
import Input from '@/components/ui/form/fields/input/Input';
import classNames from 'classnames';

interface IconInputProps
  extends Omit<React.ComponentProps<typeof Input>, 'children'> {
  icon: {
    Icon: SvgIconComponent;
    isVisible: boolean;
    handleClick?: React.MouseEventHandler;
  };
}

export default function IconInput({
  size = 'sm',
  name,
  type = 'text',
  inputmode = 'text',
  label,
  placeholder,
  handleChange,
  handleFocus,
  handleBlur,
  value,
  isValid,
  error,
  required,
  icon: { Icon, isVisible, handleClick },
}: IconInputProps) {
  const inputClasses = classNames({
    'pl-10': isVisible && size === 'sm',
    'pl-12': isVisible && size === 'lg',
  });

  const iconWrapperClasses = classNames(
    'absolute flex h-full items-center px-3',
    isVisible ? 'block' : 'hidden',
  );

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
      required={required}
      className={inputClasses}
    >
      <div className={iconWrapperClasses}>
        {handleClick ? (
          <button type="button" onClick={handleClick}>
            <Icon
              fontSize={size === 'lg' ? 'medium' : 'small'}
              className="text-muted"
            />
          </button>
        ) : (
          <Icon
            fontSize={size === 'lg' ? 'medium' : 'small'}
            className="text-muted"
          />
        )}
      </div>
    </Input>
  );
}
