import React from 'react';
import classNames from 'classnames';
import Arrow from '@/components/ui/icons/Arrow';
import Button from '@/components/ui/form/buttons/Button';
import IconButton from '@/components/ui/form/buttons/IconButton';
import { SvgIconComponent } from '@mui/icons-material';
import useSelect from '@/hooks/useSelect';
import { ButtonVariant, SelectSize, SelectVariant } from '@/types/formElemets';
import { FormElementSizes as sizes } from '@/components/ui/form/config';

export default function Select({
  variant = 'labeled',
  size = 'sm',
  name,
  translatedName,
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
  translatedName?: string;
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
    comboBoxProps,
  } = useSelect(name, label);

  const comboBoxClasses = classNames(sizes[size], className);

  const listBoxClasses = classNames(
    'border-grey-300 absolute right-0 z-[1] w-full min-w-max rounded-md bg-white drop-shadow-md',
    openDirection === 'top' && 'bottom-full',
    !isExpanded && 'hidden',
  );

  const ArrowIcon = () => (
    <Arrow direction={isExpanded ? 'up' : 'down'} className="align-bottom" />
  );

  const renderComboBox = (
    variant: ButtonVariant,
    hasArrow = true,
    content: string,
    Icon?: SvgIconComponent,
  ) =>
    Icon ? (
      <IconButton
        variant={variant}
        Icon={Icon}
        {...comboBoxProps()}
        className={comboBoxClasses}
      >
        {content}
        {hasArrow && <ArrowIcon />}
      </IconButton>
    ) : (
      <Button
        variant={variant}
        {...comboBoxProps()}
        className={comboBoxClasses}
      >
        {content}
        {hasArrow && <ArrowIcon />}
      </Button>
    );

  return (
    <div className="relative">
      {variant === 'plain' &&
        renderComboBox('outlined', false, translatedName ?? name, Icon)}
      {variant === 'labeled' && renderComboBox('text', true, selected, Icon)}
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
