import Image from 'next/image';

export default function LogoCard({ image, alt }: { image: string; alt: string }) {
    return (
        <div className="relative h-6 grow duration-500 hover:-translate-y-2 md:h-12">
            <Image src={image} alt={alt} fill className="object-contain" />
        </div>
    );
}
