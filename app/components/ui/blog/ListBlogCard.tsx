import Image from 'next/image';
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
    src: string;
    alt: string;
    date: string;
    title: string;
    excerpt: string;
    className?: string;
}) {
    const articleClasses = classNames('group rounded-lg bg-white shadow-md', className);
    return (
        <article className={articleClasses}>
            <Link
                href={{
                    pathname: '/blog/[slug]',
                    params: { slug: getFormattedSlug(href) },
                }}
                className="md:flex"
            >
                <div className="relative max-md:h-48 md:w-4/12">
                    <Image
                        src={src}
                        alt={alt}
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="max-md:rounded-t-lg md:rounded-l-lg"
                    />
                </div>
                <div className="p-6 md:w-8/12">
                    <div className="mb-4">
                        <PostDate date={date} />
                    </div>
                    <H2 className="!mb-4 !font-bold text-muted-dark transition-colors group-hover:text-primary">
                        {title}
                    </H2>
                    <p>{excerpt}</p>
                </div>
            </Link>
        </article>
    );
}
