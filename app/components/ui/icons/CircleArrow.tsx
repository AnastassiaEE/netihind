import Arrow, { ArrowDirection } from '@/components/ui/icons/Arrow';

export default function CircleArrow({
    direction = 'left',
    className,
}: {
    direction?: ArrowDirection;
    className?: string;
}) {
    return (
        <span className={`font-semibold, flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full ${className}`}>
            <Arrow direction={direction} />
        </span>
    );
}
