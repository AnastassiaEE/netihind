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
  icon: { Icon, isVisible, onClick },
  size = 'sm',
  ...props
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
    <Input size={size} className={inputClasses} {...props}>
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
