'use client';

import {
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
} from 'react-scroll-parallax';

export default function ParallaxBg({ imgSrc }: { imgSrc?: string }) {
  if (!imgSrc) return;
  return (
    <ParallaxProvider>
      <ParallaxBanner
        style={{ aspectRatio: '2 / 1', height: '36.45vw', minHeight: '300px' }}
      >
        <ParallaxBannerLayer
          image={imgSrc}
          translateY={[-20, 20]}
          speed={-20}
        />
      </ParallaxBanner>
    </ParallaxProvider>
  );
}
