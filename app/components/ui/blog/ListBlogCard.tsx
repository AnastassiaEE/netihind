import getFormattedDate from '@/utils/dateFormatter';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export default function ListBlogCard({
    href,
    src,
    alt,
    date,
    title,
    preview,
}: {
    href: string;
    src: StaticImageData;
    alt: string;
    date: string;
    title: string;
    preview: string;
}) {
    return (
        <article className="bg-white rounded-lg shadow-md group">
            <Link href={href} className="md:flex">
                <div className="max-md:h-48 md:w-4/12 relative">
                    <Image
                        src={src}
                        alt={alt}
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="max-md:rounded-t-lg md:rounded-l-lg"
                    />
                </div>
                <div className="md:w-8/12 p-6">
                    <p className="text-muted text-sm mb-4">{getFormattedDate(date)}</p>
                    <h3 className="text-[calc(1.275rem+0.3vw)] md:text-2xl font-bold mb-4 text-muted-dark group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-muted-dark">{preview}</p>
                </div>
            </Link>
        </article>
    );
}
