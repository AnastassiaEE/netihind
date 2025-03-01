import Image from 'next/image';

export default function SliderLogoCard({ image, alt }: { image: string; alt: string }) {
    return (
        <div className="group flex h-28 justify-center rounded-md border border-muted-light p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <Image src={image} alt={alt} className="object-contain opacity-20 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
        </div>
    );
}
