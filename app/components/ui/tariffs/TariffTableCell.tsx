import classNames from 'classnames';

const getCellBg = (index: number) => {
    if (index % 2 == 0) {
        return 'bg-neutral-light';
    }
    return '';
};

export default function TariffTableCell({
    index = 1,
    className,
    children,
}: {
    index?: number;
    className?: string;
    children: React.ReactNode;
}) {
    const cellClasses = classNames(
        'flex',
        'justify-center',
        'items-center',
        'break-word',
        'py-5',
        getCellBg(index),
        {
            [className as string]: className !== undefined,
        },
    );

    return <div className={cellClasses}>{children}</div>;
}
