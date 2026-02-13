import classNames from 'classnames';

export default function Tab({
  id,
  panelId,
  isActive,
  onClick,
  tabRef,
  children,
}: {
  id: string;
  panelId: string;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  tabRef: React.Ref<HTMLLIElement>;
  children: React.ReactNode;
}) {
  const tabClasses = classNames(
    'flex-1 cursor-pointer p-3 text-center font-semibold transition-colors hover:text-primary focus:outline-hidden',
    isActive && 'border-b-2 border-primary text-primary',
  );
  return (
    <li
      id={id}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : undefined}
      className={tabClasses}
      onClick={onClick}
      ref={tabRef}
    >
      {children}
    </li>
  );
}
