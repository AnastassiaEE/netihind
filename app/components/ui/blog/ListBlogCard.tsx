import Image, { StaticImageData } from 'next/image';
import { Link } from '@/i18n/routing';
import PostDate from '@/components/ui/blog/PostDate';
import getFormattedSlug from '@/utils/slugFormatter';
import { H2 } from '@/components/ui/headings/RestPageHeadings';
import classNames from 'classnames';

export default function ListBlogCard({
    href,
    src,
    alt,
    date,
    title,
    excerpt,
    className,
}: {
    href: string;
    src: StaticImageData;
    alt: string;
    date: string;
    title: string;
    excerpt: string;
    className?: string;
}) {
    const articleClasses = classNames('bg-white rounded-lg shadow-md group', {
        [className as string]: className !== undefined,
    });
    return (
        <article className={articleClasses}>
            <Link
                href={{
                    pathname: '/blog/[slug]',
                    params: { slug: getFormattedSlug(href) },
                }}
                className="md:flex"
            >
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
                    <H2 className="text-muted-dark !font-bold group-hover:text-primary transition-colors !mb-4">
                        {title}
                    </H2>
                    <p>{excerpt}</p>
                </div>
            </Link>
        </article>
    );
}
