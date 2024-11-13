import classNames from 'classnames';
import Image from 'next/image';

export default function SliderLogoCard({ image, alt }: { image: string; alt: string }) {
    const logoWrapperClasses = classNames(
        'h-28',
        'p-6',
        'border',
        'border-muted-light',
        'rounded-md',
        'flex',
        'justify-center',
        'hover:shadow-md',
        'hover:-translate-y-1',
        'transition-all',
        'duration-300',
        'group',
    );

    const imageClasses = classNames(
        'object-contain',
        'grayscale',
        'opacity-20',
        'group-hover:grayscale-0',
        'group-hover:opacity-100',
        'transition-all',
        'duration-500',
    );

    return (
        <div className={logoWrapperClasses}>
            <Image src={image} alt={alt} className={imageClasses} />
        </div>
    );
}
