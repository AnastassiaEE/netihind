'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import AddressProviderCard from './AddressProviderCard';
import 'swiper/css/bundle';

export default function ProviderCards({
    items,
}: {
    items: { [key: string]: { [key: string]: any } };
}) {
    return (
        <Swiper slidesPerView={'auto'} spaceBetween={20} className="cursor-grabbing">
            {Object.keys(items).map((item) => (
                <SwiperSlide key={item} className="!w-52 md:!w-64">
                    <AddressProviderCard
                        name={item}
                        phone={items[item].phone}
                        img={items[item].image}
                        alt={items[item].alt}
                        tariffsPath={items[item].tariffsPath}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
