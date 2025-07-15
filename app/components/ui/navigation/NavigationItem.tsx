import { Link } from '@/i18n/routing';
import classNames from 'classnames';

export default function NavigationItem({
  href,
  isActive = false,
  children,
}: {
  href: any;
  isActive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={classNames(
        'transition-colors hover:text-primary',
        isActive && 'font-extrabold text-primary',
      )}
    >
      {children}
    </Link>
  );
}
