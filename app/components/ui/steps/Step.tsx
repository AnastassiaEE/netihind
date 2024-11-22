import classNames from 'classnames';

export default function Step({
    index = 1,
    title,
    description,
    lines,
    className,
}: {
    index: number;
    title: string;
    description: string;
    lines?: string;
    className?: string;
}) {
    const stepWrapperClasses = classNames('flex', 'md:flex-col', 'basis-0', 'grow', 'relative', {
        [className as string]: className !== undefined,
        [lines as string]: lines,
    });

    return (
        <div className={stepWrapperClasses}>
            <div className="bg-neutral-light rounded-full flex justify-center items-center shrink-0 relative z-10 w-20 h-20 md:mx-auto md:mb-6">
                <span className="bg-white text-2xl font-extrabold rounded-full flex justify-center items-center shadow-md w-14 h-14">
                    {index}
                </span>
            </div>
            <div className="max-md:pl-6 md:text-center">
                <h3 className="text-[calc(1.275rem+0.3vw)] lg:text-2xl text-black font-extrabold mb-4 md:h-24">
                    {title}
                </h3>
                <p>{description}</p>
            </div>
        </div>
    );
}
