import classNames from 'classnames';
import React from 'react';

export default function SelectBox({
    openDirection = 'bottom',
    children,
}: {
    openDirection?: 'top' | 'bottom';
    children: React.ReactNode;
}) {
    const selectBoxClasses = classNames(
        'border-grey-300 absolute right-0 z-10 w-full min-w-max rounded-md bg-white drop-shadow-md',
        { 'bottom-14': openDirection === 'top' },
    );

    return (
        <div className={selectBoxClasses}>
            <ul>{children}</ul>
        </div>
    );
}
