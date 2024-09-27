import classNames from 'classnames';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

export default function LogoCard({ image, alt }: { image: StaticImageData; alt: string }) {
    const logoWrapperClasses = classNames(
        'h-6',
        'md:h-12',
        'hover:-translate-y-2',
        'duration-500',
    );

    const imageClasses = classNames('h-full', 'w-auto');

    return (
        <div className={logoWrapperClasses}>
            <Image src={image} alt={alt} className={imageClasses} />
        </div>
    );
}
