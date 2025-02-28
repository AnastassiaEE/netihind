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
        <div className="rounded-md border border-muted-light bg-white p-5 shadow-md">
            <div className="relative mb-4 h-14 w-full">
                <Image src={img} alt={alt} fill className="object-contain" />
            </div>
            <p className="text-center text-lg">{name}</p>
        </div>
    );
}
