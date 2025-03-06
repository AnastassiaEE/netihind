import React from 'react';
import classNames from 'classnames';
import SelectBox from '@/components/ui/form/fields/select/SelectBox';
import Arrow from '@/components/ui/icons/Arrow';
import Button from '@/components/ui/form/buttons/Button';
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
    openDirection?: 'top' | 'bottom';
    handleChange: (name: string, value: string) => void;
    className?: string;
    children: React.ReactNode;
}) {
    const { isBoxOpened, selectButtonRef, selectBoxRef, toggleSelect, handleOptionSelect } =
        useSelect();
    const selectClasses = classNames(sizes[size], className, variant !== 'flat' && 'uppercase');
    const selectBoxId = `${name}-select-box`;

    return (
        <div className="relative">
            <Button
                name={name}
                variant={variant}
                handleClick={toggleSelect}
                className={selectClasses}
                buttonRef={selectButtonRef}
                aria-label={label}
                aria-expanded={isBoxOpened}
                aria-haspopup="listbox"
                aria-controls={selectBoxId}
            >
                {variant === 'flat' ? (
                    <>
                        {Icon && (
                            <span className="mr-2">
                                <Icon />
                            </span>
                        )}
                        <span className="align-middle">{selected}</span>
                        <span className="float-right">
                            <Arrow direction={isBoxOpened ? 'up' : 'down'} />
                        </span>
                    </>
                ) : (
                    <>{translatedName ?? name}</>
                )}
            </Button>
            {isBoxOpened && (
                <SelectBox
                    id={selectBoxId}
                    openDirection={openDirection}
                    handleChange={(value) => handleOptionSelect(name, value, handleChange)}
                    selectBoxRef={selectBoxRef}
                >
                    {children}
                </SelectBox>
            )}
        </div>
    );
}
