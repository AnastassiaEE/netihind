import classNames from 'classnames';

export default function TabPanel({
    tabId,
    tabPanelId,
    isActive,
    children,
}: {
    tabId?: string;
    tabPanelId?: string;
    isActive?: boolean;
    children: React.ReactNode;
}) {
    const tabPanelClasses = classNames(!isActive && 'hidden');
    return (
        <div
            id={tabPanelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            className={tabPanelClasses}
        >
            {children}
        </div>
    );
}
