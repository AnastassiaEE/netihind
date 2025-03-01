'use client';

import usePopover from '@/hooks/usePopover';
import React from 'react';

export default function Popover({
    elementToInteract,
    content,
}: {
    elementToInteract: React.ReactElement;
    content: string;
}) {
    const { isVisible, show, hide } = usePopover();

    return (
        <div className="relative">
            {React.cloneElement(elementToInteract, {
                onMouseEnter: show,
                onMouseLeave: hide,
                onFocus: show,
                onBlur: hide,
                className: `${elementToInteract.props.className || ''} cursor-pointer text-xs`,
            })}
            {isVisible && (
                <span className="absolute -left-full bottom-full w-max max-w-xs rounded-lg bg-white p-3 text-center text-sm lowercase shadow-md">
                    {content}
                </span>
            )}
        </div>
    );
}
