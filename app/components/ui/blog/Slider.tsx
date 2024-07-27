'use client'

import { Pagination, Navigation } from 'swiper/modules';
import CircleArrow from '../arrow/CircleArrow';
import { Swiper } from 'swiper/react';
import 'swiper/css/bundle';

const baseArrowStyle = 
`text-black\
 bg-white\
 shadow-md\
 shadow-black/30\
 max-xl:hidden`;

const hoveredArrowStyle = 
`hover:bg-primary\
 hover:shadow-primary/50\
 hover:text-white`;

export default function Slider({children}: {children: React.ReactNode}) {

    const breakpoints = {
      0: {
        slidesPerView: 1
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      },
    }

    return (
        <div className="relative xl:px-20">
            <div className="next absolute left-0 top-1/2 -translate-y-1/2">
                <CircleArrow direction="left" style={`${baseArrowStyle} ${hoveredArrowStyle}`}/>
            </div>
            <div className="prev absolute right-0 top-1/2 -translate-y-1/2">
                <CircleArrow direction="right" style={`${baseArrowStyle} ${hoveredArrowStyle}`}/>
            </div>
            
            <div className="swiper-pagination !-bottom-10"></div>
            <Swiper
                breakpoints={breakpoints}
                navigation={{
                    nextEl: '.next',
                    prevEl: '.prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                    bulletClass: 'pagination-bullet bg-muted inline-block rounded-lg cursor-pointer transition-all duration-500 w-1.5 h-1.5 mx-1.5',
                    bulletActiveClass: 'pagination-bullet-active !bg-primary !w-6',
                }}
                modules={[Pagination, Navigation]}>
                {children}
            </Swiper>
        </div>
    )
}