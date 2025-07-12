import React from 'react';
import classNames from 'classnames';
import Arrow from '@/components/ui/icons/Arrow';
import { SvgIconComponent } from '@mui/icons-material';
import { FormElementSizes as sizes } from '@/styles/styles';
import useSelect from '@/hooks/useSelect';

export default function Select({
  name,
  translatedName,
  label,
  selected,
  Icon,
  hasArrow = true,
  displaySelected = true,
  openDirection = 'bottom',
  handleChange,
  comboBoxElement,
  className,
  children,
}: {
  name: string;
  translatedName?: string;
  label: string;
  selected: string;
  Icon?: SvgIconComponent;
  hasArrow?: boolean;
  displaySelected?: boolean;
  openDirection?: 'top' | 'bottom';
  handleChange: (name: string, value: string) => void;
  comboBoxElement: (comboBoxProps: any) => JSX.Element;
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

  const listBoxClasses = classNames(
    'border-grey-300 absolute right-0 z-[1] w-full min-w-max rounded-md bg-white drop-shadow-md',
    openDirection === 'top' && 'bottom-full',
    !isExpanded && 'hidden',
  );

  const ArrowIcon = () => (
    <Arrow direction={isExpanded ? 'up' : 'down'} className="align-bottom" />
  );
  const comboBoxContent = displaySelected ? selected : (translatedName ?? name);

  return (
    <div className="relative">
      {/* {{Icon ? (
        <IconButton Icon={Icon} {...comboBoxProps}>
          {comboBoxContent}
          {hasArrow && <ArrowIcon />}
        </IconButton>
      ) : (
        <Button {...comboBoxProps}>
          {comboBoxContent}
          {hasArrow && <ArrowIcon />}
        </Button>
      )}} */}
      {comboBoxElement(comboBoxProps())}
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
                handleSelect?: (value: string) => void;
              }>(child)
            ) {
              return React.cloneElement(child, {
                handleSelect: (value: string) =>
                  handleOptionSelect(name, value, handleChange),
              });
            }
            return child;
          })}
        </ul>
      </div>
    </div>
  );
}
