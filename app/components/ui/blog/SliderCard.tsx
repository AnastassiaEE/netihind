import Image, { StaticImageData } from 'next/image';
import { Children } from 'react';
import Link from 'next/link';


export default function SliderCard({
    href,
    src,
    alt, 
    children
}: {
    href: string,
    src: StaticImageData,
    alt: string,
    children: React.ReactNode
}) {
    const date = Children.toArray(children)[0]
    const title = Children.toArray(children)[1]
    return (
        <article className="bg-white rounded-lg shadow-md h-full">
            <div className="relative w-full h-60">
                <a href={href} className="absolute w-full h-full"></a>
                <Image 
                    src={src} 
                    alt={alt} 
                    width={0}
                    height={0}
                    className="rounded-t-lg object-cover w-full h-full"/>
            </div>
            <div className="p-6">
                <div className="text-muted text-sm flex justify-end mb-4">{date}</div>
                <h3><Link href={href}>{title}</Link></h3>
            </div>
        </article>
    )
}