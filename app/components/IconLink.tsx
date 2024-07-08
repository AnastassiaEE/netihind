'use client'
import Link from "next/link";
import colors from 'tailwindcss/colors'

export default function IconLink({
    iconLink
}: {
    iconLink: {[key: string]: any},
}) {
    return (
        <Link href={iconLink.link} className="block relative">
            <iconLink.Icon fontSize="large" strokeWidth={1} stroke="white" sx={{ 
                color: colors.indigo['500'], 
                "&:hover": { color: colors.indigo['600']}, 
                transition: 'all cubic-bezier(0.4, 0, 0.2, 1) .15s',  
            }}/>
            <span className="absolute top-0 right-[-6px] flex justify-center items-center w-4 h-4 rounded-full bg-white border border-indigo-500 text-slate-600 text-xs font-bold">1</span>
        </Link>
    )
}