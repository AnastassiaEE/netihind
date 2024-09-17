'use client';

import { ParallaxBanner, ParallaxBannerLayer, ParallaxProvider } from 'react-scroll-parallax';
import { StaticImageData } from 'next/image';

export default function ParallaxBg({ img }: { img: StaticImageData }) {
    return (
        <ParallaxProvider>
            <ParallaxBanner style={{ aspectRatio: '2 / 1', height: '36.45vw', minHeight: '300px' }}>
                <ParallaxBannerLayer image={img?.src} translateY={[-20, 20]} speed={-20} />
            </ParallaxBanner>
        </ParallaxProvider>
    );
}
