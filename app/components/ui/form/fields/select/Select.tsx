import React, { RefObject } from 'react';
import classNames from 'classnames';
import useSelect from '@/hooks/useSelect';
import SelectBox from '@/components/ui/form/fields/select/SelectBox';
import Arrow from '@/components/ui/icons/Arrow';
import Button from '@/components/ui/form/buttons/Button';
import { SvgIconComponent } from '@mui/icons-material';

const sizes: { sm: string; lg: string } = {
    sm: 'text-sm px-4 py-2.5',
    lg: 'px-5 py-3',
};

export default function Select({
    size = 'sm',
    name,
    selected,
    type = 'arrow',
    variant = 'primary',
    Icon,
    openDirection = 'bottom',
    className,
    children,
}: {
    size?: keyof typeof sizes;
    name: string;
    selected: string;
    type?: 'button' | 'arrow';
    variant?: 'primary' | 'flat';
    Icon?: SvgIconComponent;
    openDirection?: 'top' | 'bottom';
    className?: string;
    children: React.ReactNode;
}) {
    const { isBoxOpened, selectRef, handleSelectClick } = useSelect();
    const selectClasses = classNames(sizes[size], className);

    return (
        <div className="relative">
            {type === 'button' ? (
                <Button
                    handleClick={handleSelectClick}
                    buttonRef={selectRef as RefObject<HTMLButtonElement>}
                    className={classNames('uppercase', selectClasses)}
                >
                    {name}
                </Button>
            ) : (
                <div
                    className={classNames('text-primary font-semibold cursor-pointer', selectClasses)}
                    onClick={handleSelectClick}
                    ref={selectRef as RefObject<HTMLDivElement>}
                >
                    <span className="mr-2">{Icon && <Icon />}</span>
                    <span className="align-middle">{selected}</span>
                    {variant === 'primary' && (
                        <span className="float-right">
                            <Arrow direction={isBoxOpened ? 'up' : 'down'} />
                        </span>
                    )}
                </div>
            )}
            {isBoxOpened && <SelectBox openDirection={openDirection}>{children}</SelectBox>}
        </div>
    );
}
