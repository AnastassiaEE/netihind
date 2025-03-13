import Image, { StaticImageData } from 'next/image';
import { Link } from '@/i18n/routing';

export default function LinkLogo({ src, sizeClass }: { src: StaticImageData; sizeClass: string }) {
    return (
        <Link href="/">
            <Image className={sizeClass} src={src} alt="Netihind logo" width={0} height={0} />
        </Link>
    );
}
