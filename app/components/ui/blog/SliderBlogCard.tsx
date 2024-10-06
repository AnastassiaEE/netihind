import Image, { StaticImageData } from 'next/image';
import { Children } from 'react';
import Link from 'next/link';
import getFormattedDate from '@/utils/dateFormatter';

export default function SliderBlogCard({
    href,
    src,
    alt,
    date,
    title,
}: {
    href: string;
    src: StaticImageData;
    alt: string;
    date: string;
    title: string;
}) {
    return (
        <article className="bg-white rounded-lg shadow-md h-full">
            <div className="relative w-full h-60">
                <Link href={href} className="block absolute w-full h-60" />
                <Image
                    src={src}
                    alt={alt}
                    className="rounded-t-lg"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-6">
                <time className="text-muted text-sm flex justify-end mb-4" dateTime={date}>
                    {getFormattedDate(date)}
                </time>
                <h3 className="text-lg font-bold text-muted-dark hover:text-primary transition-colors">
                    <Link href={href}>{title}</Link>
                </h3>
            </div>
        </article>
    );
}
