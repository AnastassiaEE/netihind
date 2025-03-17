import classNames from 'classnames';

export default function TabPanel({
  tabId,
  tabPanelId,
  isActive,
  className,
  children,
}: {
  tabId?: string;
  tabPanelId?: string;
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const tabPanelClasses = classNames(
    'w-[700px] max-w-full py-4',
    !isActive && 'hidden',
    className,
  );
  return (
    <div
      id={tabPanelId}
      role="tabpanel"
      aria-labelledby={tabId}
      className={tabPanelClasses}
    >
      {children}
    </div>
  );
}
