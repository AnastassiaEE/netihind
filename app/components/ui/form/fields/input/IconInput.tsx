import { SvgIconComponent } from '@mui/icons-material';
import Input from '@/components/ui/form/fields/input/Input';
import classNames from 'classnames';

interface IconInputProps
  extends Omit<React.ComponentProps<typeof Input>, 'children'> {
  icon: {
    Icon: SvgIconComponent;
    isVisible: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };
}

export default function IconInput({
  size = 'sm',
  name,
  type = 'text',
  inputmode = 'text',
  label,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  value,
  isValid,
  error,
  required,
  icon: { Icon, isVisible, onClick },
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
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      isValid={isValid}
      error={error}
      required={required}
      className={inputClasses}
    >
      <div className={iconWrapperClasses}>
        {onClick ? (
          <button type="button" onClick={onClick}>
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
