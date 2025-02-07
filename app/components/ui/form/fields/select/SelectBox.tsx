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
        'bg-white border-grey-300 rounded-md absolute right-0 z-10 drop-shadow-md w-max',
        { 'bottom-14': openDirection === 'top' },
    );

    return (
        <div className={selectBoxClasses}>
            <ul>{children}</ul>
        </div>
    );
}
