'use client';

import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/components/ui/form/config';
import { KeyboardEvent as ReactKeyboardEvent } from 'react';

export default function SelectOption({
  value,
  onSelect,
  isSelected,
  size = 'sm',
  className,
  children,
}: {
  value: string;
  onSelect?: (value: string) => void;
  isSelected: boolean;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
}) {
  const optionClasses = classNames(
    'cursor-pointer text-muted-dark hover:bg-primary/10',
    isSelected && 'font-semibold text-primary',
    sizes[size],
    className,
  );

  const handleOptionKeyDown = (e: ReactKeyboardEvent<HTMLLIElement>) => {
    const { key } = e;
    if (key === 'Enter' || key === ' ') {
      onSelect?.(value);
    }
  };

  return (
    <li
      id={value}
      role="option"
      aria-selected={isSelected}
      data-value={value}
      onClick={() => onSelect?.(value)}
      onKeyDown={handleOptionKeyDown}
      className={optionClasses}
      tabIndex={0}
    >
      {children}
    </li>
  );
}
