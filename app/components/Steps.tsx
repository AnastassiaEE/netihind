import React, { Children, isValidElement } from "react";

const rightLineStyle = 
`md:after:bg-neutral\
 md:after:absolute\
 md:after:left-2/4\
 md:after:top-10\
 md:after:w-2/4\
 md:after:h-px`;
   
const leftLineStyle = 
`md:before:bg-neutral\
 md:before:absolute\ 
 md:before:left-0\
 md:before:top-10\
 md:before:w-2/4\
 md:before:h-px`;

const bottomLineStyle = 
`after:bg-neutral\
 after:absolute\
 after:left-10\
 after:top-2/4\
 after:w-px\
 after:h-2/4`;

const topLineStyle = 
`before:bg-neutral\
 before:absolute\
 before:left-10\
 before:top-0\
 before:w-px\
 before:h-2/4`;

export default function Steps({children}: {children: React.ReactNode}) {

    const drawLine = (index: number) =>  {
        if (index === 0) {
            return bottomLineStyle + " " + rightLineStyle;
        } else if (index === Children.toArray(children).length - 1) {
            return topLineStyle + " " + leftLineStyle;
        } else {
            return bottomLineStyle + " " + topLineStyle + " " + rightLineStyle + " " + leftLineStyle;
        }
    }
   
    return (
        <div className="flex flex-col md:flex-row">
                {React.Children.map(children, (child, index) => {
                        if (!isValidElement(child)) {
                            return child;
                        } else {
                            return React.cloneElement(
                                child as React.ReactElement,
                                {   index: index + 1,
                                    padding: 'max-md:py-6 md:px-6',
                                    lines: drawLine(index)
                                }
                            )
                        }
                    })
                } 
        </div>
    )
}