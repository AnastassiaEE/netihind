import classNames from 'classnames';
import React, { forwardRef } from 'react';

const SelectBox = function SelectBox({
    id,
    openDirection = 'bottom',
    handleChange,
    selectBoxRef,
    children,
}: {
    id: string;
    openDirection?: 'top' | 'bottom';
    handleChange: (value: string) => void;
    selectBoxRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}) {
    const selectBoxClasses = classNames(
        'border-grey-300 absolute right-0 z-10 w-full min-w-max rounded-md bg-white drop-shadow-md',
        openDirection === 'top' && 'bottom-full',
    );

    return (
        <div id={id} role="listbox" ref={selectBoxRef} className={selectBoxClasses}>
            <ul>
                {React.Children.map(children, (child) => {
                    if (
                        React.isValidElement<{ value: string; handleChange?: (value: string) => void }>(child)
                    ) {
                        return React.cloneElement(child, { handleChange });
                    }
                    return child;
                })}
            </ul>
        </div>
    );
};

export default SelectBox;
