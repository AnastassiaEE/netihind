import classNames from 'classnames';
import { useState } from 'react';

const sizes = {
  sm: {
    fontSize: 'text-sm',
    switchSize: 'w-[43px] h-[22px]',
    thumbSize: 'after:w-[14px] after:h-[14px]',
  },
  md: {
    fontSize: 'text-base',
    switchSize: 'w-[53px] h-[27px]',
    thumbSize: 'after:w-[19px] after:h-[19px]',
  },
  lg: {
    fontSize: 'text-base',
    switchSize: 'w-[65px] h-[33px]',
    thumbSize: 'after:w-[25px] after:h-[25px]',
  },
};

export default function ToggleSwitch({
  name,
  value,
  size = 'lg',
  label,
  isChecked = false,
  isValid = true,
  required = false,
  handleChange,
  children,
}: {
  name: string;
  value?: string;
  size?: keyof typeof sizes;
  label?: string;
  isChecked: boolean;
  isValid?: boolean;
  required?: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}) {
  const toggleClasses = classNames(
    'rounded-full bg-muted-light after:absolute after:left-1 after:top-1 after:rounded-full after:bg-white after:transition-all after:content-[""] peer-checked:bg-primary peer-checked:after:translate-x-5',
    [sizes[size].switchSize],
    [sizes[size].thumbSize],
  );

  return (
    <label className="relative flex cursor-pointer items-center">
      <input
        name={name}
        value={value}
        type="checkbox"
        aria-invalid={!isValid}
        aria-required={required}
        checked={isChecked}
        onChange={handleChange}
        className="peer sr-only"
      />
      <div className={toggleClasses}></div>
      {label && <span className={sizes[size].fontSize}>{label}</span>}
    </label>
  );
}
