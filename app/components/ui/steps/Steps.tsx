import Step from './Step';
import classNames from 'classnames';

const rightLineStyle = classNames(
    'md:after:bg-neutral',
    'md:after:absolute',
    'md:after:left-2/4',
    'md:after:top-10',
    'md:after:w-2/4',
    'md:after:h-px',
);

const leftLineStyle = classNames(
    'md:before:bg-neutral',
    'md:before:absolute',
    'md:before:left-0',
    'md:before:top-10',
    'md:before:w-2/4',
    'md:before:h-px',
);

const bottomLineStyle = classNames(
    'after:bg-neutral',
    'after:absolute',
    'after:left-10',
    'after:top-2/4',
    'after:w-px',
    'after:h-2/4',
);

const topLineStyle = classNames(
    'before:bg-neutral',
    'before:absolute',
    'before:left-10',
    'before:top-0',
    'before:w-px',
    'before:h-2/4',
);

export default function Steps({
    items,
    t
}: {
    items: { title: string; description: string }[];
    t: any
}) {
    const drawLine = (index: number) => {
        if (index === 1) {
            return `${bottomLineStyle} ${rightLineStyle}`;
        } else if (index === items.length) {
            return `${topLineStyle} ${leftLineStyle}`;
        } else {
            return `${bottomLineStyle} ${topLineStyle} ${rightLineStyle} ${leftLineStyle}`;
        }
    };

    return (
        <div className="md:flex relative -z-10">
            {items.map((item, index) => {
                return (
                    <Step
                        key={index}
                        index={index + 1}
                        title={t(item.title)}
                        description={t(item.description)}
                        padding="max-md:py-6 md:px-4 lg:px-6"
                        lines={drawLine(index + 1)}
                    ></Step>
                );
            })}
        </div>
    );
}
