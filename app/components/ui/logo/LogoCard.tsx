import classNames from 'classnames';
import Image from 'next/image';

export default function LogoCard({ image, alt }: { image: string; alt: string }) {
    const logoWrapperClasses = classNames(
        'h-6',
        'md:h-12',
        'hover:-translate-y-2',
        'duration-500',
        'relative',
        'grow',
    );

    return (
        <div className={logoWrapperClasses}>
            <Image src={image} alt={alt} fill className="object-contain" />
        </div>
    );
}
