import Image from 'next/image';
import { Link } from '@/i18n/routing';
import PostDate from '@/components/ui/blog/PostDate';
import { formatSlug } from '@/utils/slugFormatter';
import { H2 } from '@/components/ui/headings/RestPageHeadings';
import classNames from 'classnames';

export default function ListPostCard({
  href,
  imgSrc,
  alt,
  date,
  title,
  excerpt,
  className,
}: {
  href: string;
  imgSrc?: string;
  alt: string;
  date: string;
  title: string;
  excerpt: string;
  className?: string;
}) {
  const articleClasses = classNames(
    'group rounded-md bg-white shadow-md',
    className,
  );
  return (
    <article className={articleClasses}>
      <Link
        href={{
          pathname: '/blog/[slug]',
          params: { slug: formatSlug(href) },
        }}
        className="md:flex"
      >
        {imgSrc && (
          <div className="relative max-md:h-48 md:w-4/12">
            <Image
              src={imgSrc}
              alt={alt}
              className="object-cover max-md:rounded-t-lg md:rounded-l-lg"
              fill={true}
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          </div>
        )}
        <div
          className={classNames('p-6', {
            'md:w-8/12': imgSrc,
          })}
        >
          <div className="mb-4">
            <PostDate date={date} />
          </div>
          <H2 className="text-muted-dark group-hover:text-primary mb-4! font-bold! transition-colors">
            {title}
          </H2>
          <p>{excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
