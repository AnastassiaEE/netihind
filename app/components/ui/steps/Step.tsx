import { Children } from 'react';
import classNames from 'classnames';

export default function Step({
    index = 1,
    lines,
    padding,
    children,
}: {
    index: number;
    lines?: string;
    padding?: string;
    children: React.ReactNode;
}) {
    const title = Children.toArray(children)[0];
    const desc = Children.toArray(children)[1];

    const stepWrapperClasses = classNames(
        'flex',
        'flex-row',
        'md:flex-col',
        'basis-0',
        'grow',
        'relative',
        {
            [padding as string]: padding,
            [lines as string]: lines,
        },
    );

    return (
        <div className={stepWrapperClasses}>
            <div className="bg-neutral-light rounded-full flex justify-center items-center shrink-0 relative z-10 w-20 h-20 md:mx-auto md:mb-6">
                <span className="bg-white text-2xl font-extrabold rounded-full flex justify-center items-center shadow-md w-14 h-14">
                    {index}
                </span>
            </div>
            <div className="max-md:pl-6 md:text-center">
                <div className="text-[calc(1.275rem+0.3vw)] lg:text-2xl font-extrabold mb-4 md:h-24">
                    {title}
                </div>
                <p className="text-muted-dark text-base">{desc}</p>
            </div>
        </div>
    );
}
