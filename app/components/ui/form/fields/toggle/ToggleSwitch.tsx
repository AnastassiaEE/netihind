import { tv, VariantProps } from 'tailwind-variants';

const toggleVariants = tv({
  base: 'relative flex cursor-pointer items-center',
  slots: {
    input: 'peer sr-only',
    switch:
      "rounded-full bg-muted-light after:absolute after:left-1 after:top-1 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary",
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
  },
  defaultVariants: {
    size: 'sm',
    disabled: false,
  },
});

type ToggleSize = VariantProps<typeof toggleVariants>['size'];

export default function ToggleSwitch({
  name,
  value,
  size = 'sm',
  label,
  isChecked = false,
  isValid = true,
  required = false,
  disabled = false,
  handleChange,
  children,
}: {
  name: string;
  value?: string;
  size?: ToggleSize;
  label?: string;
  isChecked: boolean;
  isValid?: boolean;
  required?: boolean;
  disabled?: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}) {
  const {
    input: inputClasses,
    switch: switchClasses,
    label: labelClasses,
  } = toggleVariants({ size, disabled });

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
        onChange={handleChange}
        className={inputClasses()}
      />
      <div className={switchClasses()}></div>
      {children && <span className={labelClasses()}>{children}</span>}
    </label>
  );
}
