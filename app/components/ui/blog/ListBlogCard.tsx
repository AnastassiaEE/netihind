import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Children } from 'react';

export default function ListBlogCard({
    href,
    src,
    alt,
    children,
}: {
    href: string;
    src: StaticImageData;
    alt: string;
    children: React.ReactNode;
}) {
    const [date, title, entryTitle] = Children.toArray(children);

    return (
        <>
            <article className="bg-white rounded-lg shadow-md max-md:hidden group">
                <Link href={href} className="flex">
                    <div className="w-5/12">
                        <Image
                            src={src}
                            alt={alt}
                            width={0}
                            height={0}
                            className="rounded-l-lg w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <p className="text-muted text-sm mb-4">{date}</p>
                        <h3 className="text-2xl font-bold mb-4 text-muted-dark group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <p className="text-muted-dark text-base">{entryTitle}</p>
                    </div>
                </Link>
            </article>

            <article className="bg-white rounded-lg shadow-md md:hidden group">
                <Link href={href}>
                    <Image
                        src={src}
                        alt={alt}
                        width={0}
                        height={0}
                        className="rounded-l-lg w-full h-60 object-cover"
                    />
                    <div className="p-6">
                        <p className="text-muted text-sm mb-4">{date}</p>
                        <h3 className="text-2xl font-bold mb-4 text-muted-dark group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <p className="text-muted-dark text-base">{entryTitle}</p>
                    </div>
                </Link>
            </article>
        </>
    );
}
