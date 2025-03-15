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
    return (
        <li
            id={tabId}
            role="tab"
            aria-selected={isActive}
            aria-controls={tabPanelId}
            tabIndex={isActive ? 0 : -1}
            className="flex-1 cursor-pointer p-3 text-center font-semibold"
            onClick={handleTabClick}
        >
            {children}
        </li>
    );
}
