import classNames from 'classnames';
import React from 'react';

export default function SelectBox({
    openDirection = 'bottom',
    handleChange,
    children,
}: {
    openDirection?: 'top' | 'bottom';
    handleChange: (value: string) => void;
    children: React.ReactNode;
}) {
    const selectBoxClasses = classNames(
        'border-grey-300 absolute right-0 z-10 w-full min-w-max rounded-md bg-white drop-shadow-md',
        openDirection === 'top' && 'bottom-full',
    );

    return (
        <div className={selectBoxClasses}>
            <ul>
                {React.Children.map(children, (child) => {
                    if (
                        React.isValidElement<{ value: string; handleChange?: (value: string) => void }>(child)
                    )
                        return React.cloneElement(child, { handleChange });
                    return child;
                })}
            </ul>
        </div>
    );
}
