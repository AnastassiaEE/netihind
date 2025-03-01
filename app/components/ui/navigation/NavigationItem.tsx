'use client';

import { Link } from '@/i18n/routing';
import classNames from 'classnames';

export default function NavigationItem({
    href,
    className,
    isActive = false,
    children,
}: {
    href: any;
    className?: string;
    isActive?: boolean;
    children: React.ReactNode;
}) {
    const navigationItemClasses = classNames('transition-colors hover:text-primary', className, {
        'font-extrabold text-primary': isActive,
    });
    return (
        <Link href={href} className={navigationItemClasses}>
            {children}
        </Link>
    );
}
