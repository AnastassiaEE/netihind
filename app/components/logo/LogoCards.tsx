'use client';

import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import LogoCard from './LogoCard';

const breakpoints = {
    0: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
    640: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 30,
    },
};

const pagination = {
    clickable: true,
    el: '.logo-swiper-pagination',
    bulletClass:
        'logo-pagination-bullet bg-muted inline-block rounded-lg cursor-pointer transition-all duration-500 w-1.5 h-1.5 mx-1.5',
    bulletActiveClass: 'logo-pagination-bullet-active !bg-primary !w-6',
};

const modules = [Pagination];

export default function LogoCards({ logos }: { logos: { [key: string]: any }[] }) {
    return (
        <>
            <Swiper
                breakpoints={breakpoints}
                pagination={pagination}
                modules={modules}
                className="logo-swiper"
            >
                {logos.map((logo) => (
                    <SwiperSlide className="py-5">
                        <LogoCard image={logo.image} alt={logo.alt} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="logo-swiper-pagination pt-5 flex justify-center"></div>
        </>
    );
}
