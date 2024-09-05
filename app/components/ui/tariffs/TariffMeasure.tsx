export default function MeasureCell({
    number,
    unit,
    empty = false,
    className
}: {
    number?: string,
    unit?: string,
    empty?: boolean
    className?: string
}) {
    return (
        <div className="flex flex-col text-center mx-1">
            <span className={`font-extrabold text-lg ${className}`}>{number ?? '—'}</span>
            {!empty && <span className='text-base'>{unit}</span>}
        </div>
    )
}