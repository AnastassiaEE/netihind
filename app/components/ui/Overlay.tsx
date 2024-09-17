import classNames from 'classnames';

export default function Overlay({
    isVisible = false,
    handleClick,
}: {
    isVisible?: boolean;
    handleClick?: React.MouseEventHandler;
}) {
    const overlayClasses = classNames(
        'fixed',
        'top-0',
        'left-0',
        'w-screen',
        'h-screen',
        'bg-black/70',
        'z-20',
        {
            hidden: !isVisible,
        },
    );

    return <div className={overlayClasses} onClick={handleClick}></div>;
}
