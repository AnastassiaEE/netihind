import Link from "next/link"

export default function NavigationLink({
    name,
    link,
    padding
}: {
    name: string,
    link: string,
    padding?: string
}) {
    return (
        <Link href={link} className={`block hover:text-primary transition-colors ${padding}`}>{name}</Link>
    )
}