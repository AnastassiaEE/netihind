import React, { isValidElement } from 'react'

export default function Navigation({
    linkColor,
    type = 'horizontal', 
    children
}: {
    type?: 'horizontal' | 'vertical' 
    linkColor: string,
    children: React.ReactNode
}) {
    return (
        <nav>
            <ul className={`${type === 'horizontal' ? "flex" : undefined} text-base text-${linkColor} font-semibold`}>
                {React.Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return child;
                    } else {
                        return <li>
                            {React.cloneElement(
                            child as React.ReactElement,
                            {padding: `${type === 'horizontal' ? "px-4" : undefined} py-2`})}
                        </li>
                    }
               })}
            </ul>
        </nav>
    )
}