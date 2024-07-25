import React, { isValidElement } from 'react';

export default function HeaderItems({children}: {children: React.ReactNode}) {
    return (
        <ul className="flex">
            {React.Children.map(children, (child) => {
                if (!isValidElement(child)) {
                    return child;
                } else {
                    return <li className="p-2">
                        {React.cloneElement(child as React.ReactElement)}
                    </li>
                }
            })}
        </ul>
    )
}