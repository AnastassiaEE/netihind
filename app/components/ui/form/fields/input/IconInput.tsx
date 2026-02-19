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
  inputSize = 'sm',
  ...props
}: IconInputProps) {
  const inputClasses = classNames({
    'pl-10': isVisible && inputSize === 'sm',
    'pl-12': isVisible && inputSize === 'lg',
  });

  const iconWrapperClasses = classNames(
    'absolute flex h-full items-center px-3',
    isVisible ? 'block' : 'hidden',
  );

  return (
    <Input inputSize={inputSize} className={inputClasses} {...props}>
      <div className={iconWrapperClasses}>
        {onClick ? (
          <button type="button" onClick={onClick}>
            <Icon
              fontSize={inputSize === 'lg' ? 'medium' : 'small'}
              className="text-muted"
            />
          </button>
        ) : (
          <Icon
            fontSize={inputSize === 'lg' ? 'medium' : 'small'}
            className="text-muted"
          />
        )}
      </div>
    </Input>
  );
}
