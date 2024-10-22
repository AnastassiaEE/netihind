import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export default function Logo({ src, sizeClass }: { src: StaticImageData; sizeClass: string }) {
    return (
        <Link href="/">
            <Image className={sizeClass} src={src} alt="logo" width={0} height={0} />
        </Link>
    );
}
