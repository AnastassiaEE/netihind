import Link from "next/link"

export default function NavigationItem({
    href,
    padding,
    className,
    children
}: {
    href: string,
    padding?: string,
    className?: string
    children: React.ReactNode
}) {
    return (
        <Link href={href} className={`hover:text-primary transition-colors ${padding} ${className}`}>{children}</Link>
    )
}