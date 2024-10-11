import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import PostDate from '@/components/ui/blog/PostDate';
import getFormattedSlug from '@/utils/slugFormatter';

export default function ListBlogCard({
    href,
    src,
    alt,
    date,
    title,
    excerpt,
}: {
    href: string;
    src: StaticImageData;
    alt: string;
    date: string;
    title: string;
    excerpt: string;
}) {
    return (
        <article className="bg-white rounded-lg shadow-md group">
            <Link href={`/blogi/${getFormattedSlug(href)}`} className="md:flex">
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
                    <div className="mb-4">
                        <PostDate date={date} />
                    </div>
                    <h3 className="text-[calc(1.275rem+0.3vw)] md:text-2xl font-bold mb-4 text-muted-dark group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-muted-dark">{excerpt}</p>
                </div>
            </Link>
        </article>
    );
}
