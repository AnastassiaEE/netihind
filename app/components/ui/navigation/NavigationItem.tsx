'use client'

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
    const navigationItemClasses = classNames('hover:text-primary transition-colors', className, {
        'text-primary font-extrabold': isActive,
    });
    return (
        <Link href={href} className={navigationItemClasses}>
            {children}
        </Link>
    );
}
