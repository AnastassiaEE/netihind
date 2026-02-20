import { ToggleSwitchSize } from '@/types/form.types';
import { tv } from 'tailwind-variants';
import { toggleSwitchSizes } from '@/components/ui/form/config';

const toggleVariants = tv({
  base: 'relative flex cursor-pointer items-center',
  slots: {
    input: 'peer absolute opacity-0',
    switch:
      "rounded-full after:absolute after:left-1 after:top-1 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-focus-visible:outline-solid",
    label: 'ml-2',
  },
  variants: {
    size: toggleSwitchSizes,
    disabled: {
      true: {
        switch: 'cursor-not-allowed opacity-50',
        label: 'cursor-not-allowed opacity-50',
      },
    },
    isValid: {
      true: {
        switch: 'bg-valid',
      },
      false: {
        switch: 'bg-invalid',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    disabled: false,
    isValid: true,
  },
});

export type ToggleSwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> & {
  size?: ToggleSwitchSize;
  label?: string;
  isValid?: boolean;
};

export default function ToggleSwitch({
  size = 'sm',
  label,
  isValid = true,
  required = false,
  disabled = false,
  children,
  ...props
}: ToggleSwitchProps) {
  const {
    input: inputClasses,
    switch: switchClasses,
    label: labelClasses,
  } = toggleVariants({ size, disabled, isValid });

  const name = props.name ?? '';
  return (
    <label className={toggleVariants().base()}>
      <input
        name={name}
        type="checkbox"
        aria-invalid={!isValid}
        aria-required={required}
        aria-label={!children ? label : undefined}
        disabled={disabled}
        className={inputClasses()}
        {...props}
      />
      <div className={switchClasses()}></div>
      {children && <span className={labelClasses()}>{children}</span>}
    </label>
  );
}
