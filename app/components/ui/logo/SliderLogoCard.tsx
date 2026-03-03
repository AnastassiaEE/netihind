import Image from 'next/image';

export default function SliderLogoCard({
  imgSrc,
  alt,
}: {
  imgSrc: string;
  alt: string;
}) {
  return (
    <div className="group border-muted-light flex h-28 justify-center rounded-md border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Image
        src={imgSrc}
        alt={alt}
        className="object-contain opacity-20 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </div>
  );
}
