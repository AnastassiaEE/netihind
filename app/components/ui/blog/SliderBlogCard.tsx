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
        <article className="bg-white rounded-lg shadow-md h-full">
            <div className="relative w-full h-60">
                <Link
                    href={{
                        pathname: '/blog/[slug]',
                        params: { slug: getFormattedSlug(href) },
                    }}
                    className="block absolute w-full h-60 z-10"
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
                <div className="flex justify-end mb-4">
                    <PostDate date={date} />
                </div>
                <h3 className="text-lg font-bold text-muted-dark hover:text-primary transition-colors">
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
