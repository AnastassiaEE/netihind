import classNames from 'classnames';

export default function MeasureCell({
    number,
    unit,
    empty = false,
    className,
}: {
    number?: string;
    unit?: string;
    empty?: boolean;
    className?: string;
}) {
    const numberClasses = classNames('font-extrabold text-lg', {
        [className as string]: className !== undefined,
    });

    return (
        <div className="flex flex-col text-center uppercase mx-1">
            <span className={numberClasses}>{number ?? '—'}</span>
            {!empty && <span>{unit}</span>}
        </div>
    );
}
