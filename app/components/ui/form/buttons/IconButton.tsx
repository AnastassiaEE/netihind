import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import Button from '@/components/ui/form/buttons/Button';
import classNames from 'classnames';

type IconButtonProps = React.ComponentProps<typeof Button> & {
  Icon: SvgIconComponent;
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ Icon, size = 'sm', className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={classNames(
          'flex items-center justify-center gap-2',
          className,
        )}
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
