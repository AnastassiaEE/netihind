import React, { isValidElement } from 'react'

export default function Navigation({
    type = 'horizontal', 
    linkColor = 'muted-dark',
    children
}: {
    type?: 'horizontal' | 'vertical' 
    linkColor?: string,
    children: React.ReactNode
}) {
    return (
        <nav>
            <ul className={`${type === 'horizontal' && "flex flex-wrap justify-center"} text-base text-${linkColor} font-semibold`}>
                {React.Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return child;
                    } else {
                        return <li>
                            {React.cloneElement(
                                child as React.ReactElement,
                                {padding: `${type === 'horizontal' && "px-4"} py-2 block`}
                            )}
                        </li>
                    }
               })}
            </ul>
        </nav>
    )
}