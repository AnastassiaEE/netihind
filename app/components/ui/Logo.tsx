'use client'

import i18nConfig from '@/i18nConfig';
import getLocalePrefix from '@/utils/getLocalePrefix';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Logo({ src, sizeClass }: { src: StaticImageData; sizeClass: string }) {
    const { i18n } = useTranslation('navigation');
    const localePrefix = getLocalePrefix(i18n.language, i18nConfig.defaultLocale);
    return (
        <Link href={`${localePrefix}/`}>
            <Image className={sizeClass} src={src} alt="logo" width={0} height={0} />
        </Link>
    );
}
