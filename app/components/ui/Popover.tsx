'use client';

import { SvgIconComponent } from '@mui/icons-material';
import usePopover from '@/hooks/usePopover';

export default function Popover({
    IconToInteract,
    content,
}: {
    IconToInteract: SvgIconComponent;
    content: string;
}) {
    const { isVisible, handleMouseEnter, handleMouseLeave } = usePopover();

    return (
        <span className="relative align-text-bottom">
            <IconToInteract
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="text-primary cursor-pointer"
                fontSize="small"
            />
            {isVisible && (
                <span className="bg-white text-sm rounded-lg shadow-md absolute bottom-full left-6 w-60 p-3">
                    {content}
                </span>
            )}
        </span>
    );
}
