import Image from "next/image";

export default function LogoCard({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative h-6 grow duration-500 hover:-translate-y-2 md:h-12">
            <Image src={src} alt={alt} fill className="object-contain" />
        </div>
    );
}
