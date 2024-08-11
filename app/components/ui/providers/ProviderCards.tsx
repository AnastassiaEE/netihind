'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import ProviderCard from './ProviderCard';
import 'swiper/css/bundle';



export default function ProviderCards({items}: {items: {[key: string]: any}[]}) {
    return (
        <Swiper 
          slidesPerView={'auto'}
          spaceBetween={30} 
          className="cursor-grabbing">
            {items.map(item => 
                <SwiperSlide key={item.phone} className="!w-48">
                    <ProviderCard 
                        phone={item.phone} 
                        img={item.image}
                        alt={item.alt}
                        tariffsPath={item.tariffsPath}/>
                </SwiperSlide>
            )}   
        </Swiper>
    )
}