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
        'hover:text-primary transition-colors',
        isActive && 'text-primary font-extrabold',
      )}
    >
      {children}
    </Link>
  );
}
