import Image, { StaticImageData } from "next/image"

export default function bgPhoto({src}: {src: StaticImageData}) {
    return (
        <div className="relative z-0">
            <Image
                src={src}
                alt=""
                className="relative z-10 w-full"/>
            <div className="bg-gradient-to-br from-primary from-10% via-secondary to-accent to-60% rounded-3xl absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[90%]">
            </div>
            <div className="bg-gradient-to-tl from-primary from-10% via-secondary to-accent to-80% rounded-full absolute right-0 sm:right-3 md:right-0 xl:right-2 2xl:right-3 top-1/4 z-10 w-8 h-8"></div>
            <div className="bg-gradient-to-br from-primary from-10% via-secondary to-accent to-65% rounded-full absolute -left-1 md:-left-6 top-3/4 z-10 w-4 h-4"></div>
        </div>
    )
}