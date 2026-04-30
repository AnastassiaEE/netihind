import React from 'react';
import classNames from 'classnames';
import Arrow from '@/components/ui/icons/Arrow';
import { Button, buttonVariants } from '@/components/ui/buttons/Button';
import { SvgIconComponent } from '@mui/icons-material';
import useSelect from '@/hooks/useSelect';
import { SelectSize, SelectVariant } from '@/types/form.types';
import { VariantProps } from 'class-variance-authority';
import { FormElementSizes as sizes } from '@/components/ui/form/config';

export default function Select({
  variant = 'labeled',
  size = 'sm',
  name,
  buttonLabel,
  label,
  selected,
  Icon,
  openDirection = 'bottom',
  onChange,
  className,
  children,
}: {
  variant?: SelectVariant;
  size?: SelectSize;
  name: string;
  buttonLabel?: string;
  label: string;
  selected: string;
  Icon?: SvgIconComponent;
  openDirection?: 'top' | 'bottom';
  onChange: (name: string, value: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const {
    isExpanded,
    listBoxId,
    listBoxRef,
    handleOptionSelect,
    getComboBoxProps,
  } = useSelect(name, label);

  const comboBoxClasses = classNames(sizes[size], className);

  const listBoxClasses = classNames(
    'border-grey-300 absolute right-0 z-1 w-full min-w-max rounded-md bg-white drop-shadow-md',
    openDirection === 'top' && 'bottom-full',
    !isExpanded && 'hidden',
  );

  const ArrowIcon = () => (
    <Arrow direction={isExpanded ? 'up' : 'down'} className="align-bottom" />
  );

  const renderComboBox = (
    variant: VariantProps<typeof buttonVariants>['variant'],
    hasArrow = true,
    content: string,
    Icon?: SvgIconComponent,
  ) => (
    <Button
      variant={variant}
      {...getComboBoxProps()}
      className={comboBoxClasses}
    >
      {Icon && <Icon />}
      {content}
      {hasArrow && <ArrowIcon />}
    </Button>
  );

  return (
    <div className="relative">
      {variant === 'plain' &&
        renderComboBox('outline', false, buttonLabel ?? name, Icon)}
      {variant === 'labeled' && renderComboBox('ghost', true, selected, Icon)}
      <div
        id={listBoxId}
        role="listbox"
        ref={listBoxRef}
        className={listBoxClasses}
      >
        <ul>
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement<{
                value: string;
                onSelect?: (value: string) => void;
              }>(child)
            ) {
              return React.cloneElement(child, {
                onSelect: (value: string) =>
                  handleOptionSelect(name, value, onChange),
              });
            }
            return child;
          })}
        </ul>
      </div>
    </div>
  );
}
