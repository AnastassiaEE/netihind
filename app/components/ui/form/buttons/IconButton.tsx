import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import Button from '@/components/ui/form/buttons/Button';
import classNames from 'classnames';

type IconButtonProps = Omit<React.ComponentProps<typeof Button>, 'children'> & {
  Icon: SvgIconComponent;
  children: React.ReactNode;
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      type = 'button',
      variant = 'contained',
      size = 'sm',
      disabled = false,
      name,
      Icon,
      handleClick,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        type={type}
        variant={variant}
        size={size}
        disabled={disabled}
        name={name}
        className={classNames(
          'flex items-center justify-around gap-2',
          className,
        )}
        handleClick={handleClick}
        {...props}
      >
        <Icon fontSize={size === 'lg' ? 'medium' : 'small'} />
        {children}
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
