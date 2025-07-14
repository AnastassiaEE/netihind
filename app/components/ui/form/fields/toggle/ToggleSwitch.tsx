import { ToggleSwitchSize } from '@/types/form.types';
import { tv } from 'tailwind-variants';

const toggleVariants = tv({
  base: 'relative flex cursor-pointer items-center',
  slots: {
    input: 'peer absolute opacity-0',
    switch:
      "rounded-full after:absolute after:left-1 after:top-1 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-focus-visible:outline",
    label: 'ml-2',
  },
  variants: {
    size: {
      sm: {
        switch:
          'h-[22px] w-[43px] after:size-[14px] peer-checked:after:translate-x-[21px]',
        label: 'text-sm',
      },
      md: {
        switch:
          'h-[27px] w-[53px] after:size-[19px] peer-checked:after:translate-x-[26px]',
        label: 'text-base',
      },
      lg: {
        switch:
          'h-[33px] w-[65px] after:size-[25px] peer-checked:after:translate-x-[32px]',
        label: 'text-lg',
      },
    },
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

export default function ToggleSwitch({
  name,
  value,
  size = 'sm',
  label,
  isChecked = false,
  isValid = true,
  required = false,
  disabled = false,
  onChange,
  children,
}: {
  name: string;
  value?: string;
  size?: ToggleSwitchSize;
  label?: string;
  isChecked: boolean;
  isValid?: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}) {
  const {
    input: inputClasses,
    switch: switchClasses,
    label: labelClasses,
  } = toggleVariants({ size, disabled, isValid });

  return (
    <label className={toggleVariants().base()}>
      <input
        name={name}
        value={value}
        type="checkbox"
        aria-invalid={!isValid}
        aria-required={required}
        aria-label={!children ? label : undefined}
        checked={isChecked}
        disabled={disabled}
        onChange={onChange}
        className={inputClasses()}
      />
      <div className={switchClasses()}></div>
      {children && <span className={labelClasses()}>{children}</span>}
    </label>
  );
}
