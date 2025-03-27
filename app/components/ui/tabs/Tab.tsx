import classNames from 'classnames';

export default function Tab({
  tabId,
  tabPanelId,
  isActive,
  handleTabClick,
  tabRef,
  children,
}: {
  tabId: string;
  tabPanelId: string;
  isActive: boolean;
  handleTabClick: React.MouseEventHandler<HTMLElement>;
  tabRef: React.Ref<HTMLLIElement>;
  children: React.ReactNode;
}) {
  const tabClasses = classNames(
    'flex-1 cursor-pointer p-3 text-center font-semibold transition-colors hover:text-primary focus:outline-none',
    isActive && 'border-b-2 border-primary text-primary',
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
      ref={tabRef}
    >
      {children}
    </li>
  );
}
