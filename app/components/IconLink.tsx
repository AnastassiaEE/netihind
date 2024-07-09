'use client'

import Link from "next/link";

export default function IconLink({
    iconLink
}: {
    iconLink: {[key: string]: any},
}) {
    return (
        <Link href={iconLink.link} className="block relative">
            <iconLink.Icon 
                fontSize="large" 
                strokeWidth={1} 
                stroke="white" 
                className="text-primary hover:text-primary-dark transition"/>
            <span className="absolute top-0 right-[-6px] flex justify-center items-center w-4 h-4 rounded-full bg-white border border-primary text-muted-dark text-xs font-bold">1</span>
        </Link>
    )
}