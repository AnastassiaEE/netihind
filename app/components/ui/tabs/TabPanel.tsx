import classNames from 'classnames';

export default function TabPanel({
  tabId,
  id,
  isActive,
  className,
  children,
}: {
  tabId: string;
  id: string;
  isActive: boolean;
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
      id={id}
      role="tabpanel"
      aria-labelledby={tabId}
      className={tabPanelClasses}
    >
      {children}
    </div>
  );
}
