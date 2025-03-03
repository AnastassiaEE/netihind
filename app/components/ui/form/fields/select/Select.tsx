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
    selected: string;
    variant?: 'primary' | 'secondary' | 'neutral' | 'flat';
    Icon?: SvgIconComponent;
    openDirection?: 'top' | 'bottom';
    handleChange: (name: string, value: string) => void;
    className?: string;
    children: React.ReactNode;
}) {
    const { isBoxOpened, selectRef, handleSelectClick } = useSelect();
    const selectClasses = classNames(sizes[size], className, variant !== 'flat' && 'uppercase');

    return (
        <div className="relative">
            <Button
                name={name}
                variant={variant}
                handleClick={handleSelectClick}
                className={selectClasses}
                buttonRef={selectRef}
            >
                {variant === 'flat' ? (
                    <>
                        <span className="mr-2">{Icon && <Icon />}</span>
                        <span className="align-middle">{selected}</span>
                        <span className="float-right">
                            <Arrow direction={isBoxOpened ? 'up' : 'down'} />
                        </span>
                    </>
                ) : (
                    <>{name}</>
                )}
            </Button>
            {isBoxOpened && (
                <SelectBox
                    openDirection={openDirection}
                    handleChange={(value) => handleChange(name, value)}
                >
                    {children}
                </SelectBox>
            )}
        </div>
    );
}
