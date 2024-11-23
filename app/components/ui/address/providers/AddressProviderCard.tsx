import Image from 'next/image';

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
        <div className="bg-white shadow-md rounded-md border border-muted-light p-5">
            <div className="h-14 w-full mb-4 relative">
                <Image src={img} alt={alt} fill className="object-contain" />
            </div>
            <p className="text-lg text-center">{name}</p>
        </div>
    );
}
