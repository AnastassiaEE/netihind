import { SvgIconComponent } from '@mui/icons-material';
import Button, { ButtonVariant, ButtonSize } from '@/components/ui/form/buttons/Button';
import classNames from 'classnames';

export default function IconButton({
    type = 'button',
    variant = 'primary',
    size = 'sm',
    disabled = false,
    name,
    className,
    Icon,
    handleClick,
    children,
}: {
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    name?: string;
    className?: string;
    Icon: SvgIconComponent;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}) {
    const iconClasses = classNames(
        'mr-2 align-text-bottom',
        variant === 'secondary' && 'text-primary',
    );

    return (
        <Button
            type={type}
            variant={variant}
            size={size}
            disabled={disabled}
            name={name}
            className={className}
            handleClick={handleClick}
        >
            <Icon fontSize={size === 'lg' ? 'medium' : 'small'} className={iconClasses} />
            {children}
        </Button>
    );
}
