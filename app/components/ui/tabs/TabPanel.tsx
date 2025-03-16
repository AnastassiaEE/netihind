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
  const tabPanelClasses = classNames(
    'w-[700px] max-w-full py-4',
    !isActive && 'hidden',
  );
  return (
    <div
      id={tabPanelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={isActive ? 0 : undefined}
      className={tabPanelClasses}
    >
      {children}
    </div>
  );
}
