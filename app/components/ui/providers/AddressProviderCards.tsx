'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import AddressProviderCard from '@/components/ui/providers/AddressProviderCard';
import 'swiper/css/bundle';
import { Pagination } from 'swiper/modules';

const breakpoints = {
    0: {
        slidesPerView: 2,
    },
    640: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 30,
    },
};

const modules = [Pagination];

const pagination = {
    clickable: true,
    el: '.swiper-pagination',
    bulletClass:
        'pagination-bullet bg-muted inline-block rounded-lg cursor-pointer transition-all duration-500 w-1.5 h-1.5 mx-1.5',
    bulletActiveClass: 'pagination-bullet-active !bg-primary !w-6',
};

export default function AddressProviderCards({
    providers,
}: {
    providers?: { [key: string]: string }[];
}) {
    return (
        <div className="relative">
            <Swiper
                className="cursor-grabbing !py-6"
                breakpoints={breakpoints}
                pagination={pagination}
                modules={modules}
            >
                {providers?.map((provider) => (
                    <SwiperSlide key={provider.name}>
                        <AddressProviderCard
                            name={provider.name}
                            img={provider.img}
                            alt={`${provider.name} logo`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-pagination !-bottom-5"></div>
        </div>
    );
}
