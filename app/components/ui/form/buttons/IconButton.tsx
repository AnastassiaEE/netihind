import { SvgIconComponent } from '@mui/icons-material';
import Button from './Button';
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
    variant?: 'primary' | 'secondary' | 'success';
    size?: 'sm' | 'lg';
    disabled?: boolean;
    name?: string;
    className?: string;
    Icon: SvgIconComponent;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}) {
    const iconClasses = classNames('mr-2', {
        'text-primary': variant === 'secondary',
    });

    const Ic = <Icon fontSize={size === 'lg' ? 'medium' : 'small'} className={iconClasses} />;

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
            {Ic}
            {children}
        </Button>
    );
}
