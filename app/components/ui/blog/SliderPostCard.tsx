import Image from 'next/image';
import { Link } from '@/i18n/routing';
import PostDate from '@/components/ui/blog/PostDate';
import getFormattedSlug from '@/utils/slugFormatter';

export default function SliderPostCard({
  href,
  imgSrc,
  alt,
  date,
  title,
}: {
  href: string;
  imgSrc?: string;
  alt: string;
  date: string;
  title: string;
}) {
  return (
    <article className="h-full rounded-md bg-white shadow-md">
      {imgSrc && (
        <div className="relative h-60 w-full">
          <Link
            href={{
              pathname: '/blog/[slug]',
              params: { slug: getFormattedSlug(href) },
            }}
            className="absolute z-10 block h-60 w-full"
          >
            <Image
              src={imgSrc}
              alt={alt}
              className="rounded-t-lg object-cover"
              fill={true}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          </Link>
        </div>
      )}

      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <PostDate date={date} />
        </div>
        <h3 className="text-muted-dark hover:text-primary text-lg font-bold transition-colors">
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
