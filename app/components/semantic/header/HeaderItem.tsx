import Link from "next/link"

export default function HeaderItem({
    link, 
    Icon
}: {
    link: string,
    Icon: any
}) {
    return (
        <Link href={link} className="block relative">
            <Icon 
                fontSize="large" 
                strokeWidth={1} 
                stroke="white" 
                className="text-primary hover:text-primary-dark transition-colors"/>
            <span className="absolute top-0 right-[-6px] flex justify-center items-center w-4 h-4 rounded-full bg-white border border-primary text-muted-dark text-xs font-bold">1</span>
        </Link>
    )
}