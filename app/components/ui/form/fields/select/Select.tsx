import React from 'react';
import classNames from 'classnames';
import Arrow from '@/components/ui/icons/Arrow';
import Button from '@/components/ui/form/buttons/Button';
import IconButton from '@/components/ui/form/buttons/IconButton';
import { SvgIconComponent } from '@mui/icons-material';
import { FormElementSizes as sizes } from '@/styles/styles';
import useSelect from '@/hooks/useSelect';

export default function Select({
    size = 'sm',
    name,
    translatedName,
    label,
    selected,
    variant = 'primary',
    Icon,
    hasArrow = true,
    displaySelected = true,
    openDirection = 'bottom',
    handleChange,
    className,
    children,
}: {
    size?: keyof typeof sizes;
    name: string;
    translatedName?: string;
    label: string;
    selected: string;
    variant?: 'primary' | 'secondary' | 'neutral' | 'flat';
    Icon?: SvgIconComponent;
    hasArrow?: boolean;
    displaySelected?: boolean;
    openDirection?: 'top' | 'bottom';
    handleChange: (name: string, value: string) => void;
    className?: string;
    children: React.ReactNode;
}) {
    const { isExpanded, comboBoxRef, listBoxRef, toggleSelect, handleOptionSelect } = useSelect();

    const comboBoxClasses = classNames(sizes[size], className, variant !== 'flat' && 'uppercase');
    const listBoxClasses = classNames(
        'border-grey-300 absolute right-0 z-[1] w-full min-w-max rounded-md bg-white drop-shadow-md',
        openDirection === 'top' && 'bottom-full',
        !isExpanded && 'hidden pointer-events-none',
    );

    const listBoxId = `${name}-select-box`;

    const comboBoxProps = {
        variant: variant,
        handleClick: toggleSelect,
        className: comboBoxClasses,
        ref: comboBoxRef,
        role: 'combobox',
        'aria-label': label,
        'aria-expanded': isExpanded,
        'aria-haspopup': 'listbox',
        'aria-controls': listBoxId,
    };

    const ArrowIcon = () => <Arrow direction={isExpanded ? 'up' : 'down'} className="align-bottom" />;
    const comboBoxContent = displaySelected ? selected : translatedName ?? name;

    return (
        <div className="relative">
            {Icon ? (
                <IconButton Icon={Icon} {...comboBoxProps}>
                    {comboBoxContent}
                    {hasArrow && <ArrowIcon />}
                </IconButton>
            ) : (
                <Button {...comboBoxProps}>
                    {comboBoxContent}
                    {hasArrow && <ArrowIcon />}
                </Button>
            )}
            <div id={listBoxId} role="listbox" ref={listBoxRef} className={listBoxClasses}>
                <ul>
                    {React.Children.map(children, (child) => {
                        if (
                            React.isValidElement<{ value: string; handleSelect?: (value: string) => void }>(child)
                        ) {
                            return React.cloneElement(child, {
                                handleSelect: (value: string) => handleOptionSelect(name, value, handleChange),
                            });
                        }
                        return child;
                    })}
                </ul>
            </div>
        </div>
    );
}
