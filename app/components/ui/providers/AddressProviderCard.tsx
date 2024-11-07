import Image from 'next/image';
import classNames from 'classnames';

const cardWrapperClasses = classNames(
    'bg-white',
    'shadow-md',
    'rounded-md',
    'border',
    'border-muted-light',
    'p-5',
);

export default function AddressProviderCard({
    name,
    img,
    alt,
}: {
    name: string;
    img: string;
    alt: string;
}) {
    return (
        <div className={cardWrapperClasses}>
            <div className="h-16 w-full mb-4 relative">
                <Image src={img} alt={alt} fill className="object-contain" />
            </div>
            <p className="text-lg text-center">{name}</p>
        </div>
    );
}
