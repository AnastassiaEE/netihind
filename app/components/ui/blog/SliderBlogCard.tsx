import Image from 'next/image';
import { Link } from '@/i18n/routing';
import PostDate from '@/components/ui/blog/PostDate';
import getFormattedSlug from '@/utils/slugFormatter';

export default function SliderBlogCard({
    href,
    src,
    alt,
    date,
    title,
}: {
    href: string;
    src: string;
    alt: string;
    date: string;
    title: string;
}) {
    return (
        <article className="h-full rounded-lg bg-white shadow-md">
            <div className="relative h-60 w-full">
                <Link
                    href={{
                        pathname: '/blog/[slug]',
                        params: { slug: getFormattedSlug(href) },
                    }}
                    className="absolute z-10 block h-60 w-full"
                >
                    <Image
                        src={src}
                        alt={alt}
                        className="rounded-t-lg"
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>
            </div>
            <div className="p-6">
                <div className="mb-4 flex justify-end">
                    <PostDate date={date} />
                </div>
                <h3 className="text-lg font-bold text-muted-dark transition-colors hover:text-primary">
                    <Link
                        href={{
                            pathname: '/blog/[slug]',
                            params: { slug: getFormattedSlug(href) },
                        }}
                    >
                        {title}
                    </Link>
                </h3>
            </div>
        </article>
    );
}
