import Link from "next/link"

export default function NavigationLink({
    href,
    padding,
    children
}: {
    href: string,
    padding?: string,
    children: React.ReactNode
}) {
    return (
        <Link href={href} className={`display-block hover:text-primary transition-colors ${padding}`}>{children}</Link>
    )
}