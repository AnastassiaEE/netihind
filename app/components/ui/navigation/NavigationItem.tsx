import Link from "next/link"

export default function NavigationLink({
    link,
    padding,
    children
}: {
    link: string,
    padding?: string,
    children: React.ReactNode
}) {
    return (
        <Link href={link} className={`display-block hover:text-primary transition-colors ${padding}`}>{children}</Link>
    )
}