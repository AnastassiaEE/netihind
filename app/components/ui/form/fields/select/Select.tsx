import React, { RefObject } from 'react';
import classNames from 'classnames';
import useSelect from '@/hooks/useSelect';
import SelectBox from '@/components/ui/form/fields/select/SelectBox';
import Arrow from '@/components/ui/icons/Arrow';
import Button from '@/components/ui/form/buttons/Button';
import { SvgIconComponent } from '@mui/icons-material';

const sizes: { sm: string; lg: string } = {
    sm: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3',
};

export default function Select({
    size = 'sm',
    name,
    selected,
    variant = 'primary',
    Icon,
    openDirection = 'bottom',
    className,
    children,
}: {
    size?: keyof typeof sizes;
    name: string;
    selected: string;
    variant?: 'primary' | 'secondary' | 'neutral' | 'flat';
    Icon?: SvgIconComponent;
    openDirection?: 'top' | 'bottom';
    className?: string;
    children: React.ReactNode;
}) {
    const { isBoxOpened, selectRef, handleSelectClick } = useSelect();
    const selectClasses = classNames(sizes[size], className, {
        uppercase: variant !== 'flat',
        'rounded-md border border-muted-light': variant === 'flat',
    });

    return (
        <div className="relative">
            <Button
                variant={variant}
                handleClick={handleSelectClick}
                buttonRef={selectRef as RefObject<HTMLButtonElement>}
                className={selectClasses}
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
            {isBoxOpened && <SelectBox openDirection={openDirection}>{children}</SelectBox>}
        </div>
    );
}
