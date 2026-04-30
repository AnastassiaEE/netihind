import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import classNames from 'classnames';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border font-semibold transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary/Contained - your main action button
        default:
          'bg-primary text-white border-primary hover:bg-primary-dark shadow-md shadow-primary/30 hover:shadow-none',
        // Outlined - secondary action
        outline:
          'border-primary text-primary bg-white hover:bg-primary hover:text-white',
        // Neutral/Secondary - tertiary action
        secondary:
          'border-primary-light bg-primary-light text-muted-dark hover:bg-primary hover:text-white',
        // Ghost/Text - minimal styling
        ghost: 'border-transparent text-primary',
        // Destructive - for dangerous actions
        destructive: 'bg-error text-white border-error hover:bg-error/90',
        // Link - text with underline
        link: 'border-transparent text-primary underline-offset-4 hover:text-primary-dark',
      },
      size: {
        xs: "h-7 gap-1 px-2 text-xs rounded-md [&_svg:not([class*='size-'])]:size-3",
        sm: "h-10 gap-1.5 px-3 text-sm rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-6 text-sm rounded-md [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'sm',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={classNames(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
