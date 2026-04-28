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
    return (
        <div className={classNames('relative flex grow basis-0 md:flex-col', className, lines)}>
            <div className="relative z-10 flex size-20 shrink-0 items-center justify-center rounded-full bg-primary-light md:mx-auto md:mb-6">
                <span className="flex size-14 items-center justify-center rounded-full bg-white text-2xl font-extrabold shadow-md">
                    {index}
                </span>
            </div>
            <div className="max-md:pl-6 md:text-center">
                <h3 className="mb-4 text-[calc(1.275rem+0.3vw)] font-extrabold text-black md:h-16 lg:text-2xl">
                    {title}
                </h3>
                <p>{description}</p>
            </div>
        </div>
    );
}
