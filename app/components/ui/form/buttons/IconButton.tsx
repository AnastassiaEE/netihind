import { SvgIconComponent } from '@mui/icons-material';
import Button from '@/components/ui/form/buttons/Button';
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
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'lg';
    disabled?: boolean;
    name?: string;
    className?: string;
    Icon: SvgIconComponent;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}) {
    const iconClasses = classNames('mr-2 align-text-bottom', {
        'text-primary': variant === 'secondary',
    });

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
