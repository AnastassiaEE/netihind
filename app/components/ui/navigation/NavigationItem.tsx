'use client';

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
    const linkClasses = classNames(
        'transition-colors hover:text-primary',
        isActive && 'font-extrabold text-primary',
    );
    return (
        <Link href={href} className={linkClasses}>
            {children}
        </Link>
    );
}
