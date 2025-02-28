'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import AddressProviderCard from '@/components/ui/address/providers/AddressProviderCard';
import 'swiper/css/bundle';
import { Pagination } from 'swiper/modules';

const breakpoints = {
    0: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    992: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    1200: {
        slidesPerView: 5,
        spaceBetween: 20,
    },
};

const modules = [Pagination];

const pagination = {
    clickable: true,
    el: '.swiper-pagination',
    bulletClass:
        'pagination-bullet mx-1.5 inline-block size-1.5 cursor-pointer rounded-lg bg-muted transition-all duration-500',
    bulletActiveClass: 'pagination-bullet-active !w-6 !bg-primary',
};

export default function AddressProviderCards({
    providers,
}: {
    providers: { name: string; img: string }[];
}) {
    return (
        <div className="relative">
            <Swiper
                className="cursor-grabbing !pb-6"
                breakpoints={breakpoints}
                pagination={pagination}
                modules={modules}
            >
                {providers.map(({ name, img }) => (
                    <SwiperSlide key={name}>
                        <AddressProviderCard name={name} img={img} alt={`${name} logo`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-pagination !-bottom-5"></div>
        </div>
    );
}
