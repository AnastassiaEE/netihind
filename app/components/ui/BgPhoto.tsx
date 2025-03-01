import Image, { StaticImageData } from 'next/image';

export default function bgPhoto({ src }: { src: StaticImageData }) {
    return (
        <div className="relative z-0">
            <Image src={src} alt="" className="relative z-10 w-full" />
            <div className="absolute bottom-0 left-1/2 size-[90%] -translate-x-1/2 rounded-3xl bg-gradient-to-br from-primary from-10% via-secondary to-accent to-60%"></div>
            <div className="absolute right-0 top-1/4 z-10 size-8 rounded-full bg-gradient-to-tl from-primary from-10% via-secondary to-accent to-80% sm:right-3 md:right-0 xl:right-2 2xl:right-3"></div>
            <div className="absolute -left-1 top-3/4 z-10 size-4 rounded-full bg-gradient-to-br from-primary from-10% via-secondary to-accent to-65% md:-left-6"></div>
        </div>
    );
}
