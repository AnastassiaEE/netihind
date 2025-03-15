import classNames from 'classnames';

export default function Tab({
    tabId,
    tabPanelId,
    isActive,
    handleTabClick,
    children,
}: {
    tabId: string;
    tabPanelId: string;
    isActive: boolean;
    handleTabClick: React.MouseEventHandler<HTMLLIElement>;
    children: React.ReactNode;
}) {
    const tabClasses = classNames(
        'flex-1 cursor-pointer p-3 text-center font-semibold',
        isActive && 'text-primary border-b-2 border-primary',
    );
    return (
        <li
            id={tabId}
            role="tab"
            aria-selected={isActive}
            aria-controls={tabPanelId}
            tabIndex={isActive ? 0 : undefined}
            className={tabClasses}
            onClick={handleTabClick}
        >
            {children}
        </li>
    );
}
