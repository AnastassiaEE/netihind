'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';
import { ChevronLeft, ChevronRight }  from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const baseArrowStyle = 
`bg-white\
 font-semibold\
 rounded-full\
 flex\
 justify-center\
 shrink-0\
 items-center\
 w-9\
 h-9\
 cursor-pointer\
 shadow-md\
 shadow-black/30\
 transition-colors\
 max-xl:hidden`;

const hoveredArrowStyle = 
`!bg-primary\
 !shadow-primary/50`;

export default function Carousel({posts}: {posts: {[key:string]: string}[]}) {
    const [isLeftArrowHovered, setIsLeftArrowHovered] = useState(false);
    const [isRightArrowHovered, setIsRightArrowHovered] = useState(false);

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

    const handleArrowHover = (arrow: string) => arrow === 'left'? setIsLeftArrowHovered(true): setIsRightArrowHovered(true);
    const handleArrowLeave = (arrow: string) => arrow === 'left'? setIsLeftArrowHovered(false): setIsRightArrowHovered(false);

    return (
        <div className="relative xl:px-20">
            <div className={`prev ${baseArrowStyle} ${isLeftArrowHovered ? hoveredArrowStyle : undefined} absolute left-0 top-1/2 -translate-y-1/2`} 
                    onMouseEnter={() => handleArrowHover('left')}
                    onMouseLeave={() => handleArrowLeave('left')}>
                    {<ChevronLeft className={isLeftArrowHovered ? "text-white" : "text-black"}/>}
            </div>
            <div className={`next ${baseArrowStyle} ${isRightArrowHovered ? hoveredArrowStyle : undefined} absolute right-0 top-1/2 -translate-y-1/2`} 
                    onMouseEnter={() => handleArrowHover('right')}
                    onMouseLeave={() => handleArrowLeave('right')}>
                    {<ChevronRight className={isRightArrowHovered ? "text-white" : "text-black"}/>}
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
                {posts.map(post => 
                <SwiperSlide key={post.title} className="pb-4 !h-auto">
                    <article className="bg-white rounded-lg shadow-md h-full">
                    <div className="relative w-full h-60">
                        <a href={post.link} className="absolute w-full h-full"></a>
                        <Image 
                            src={post.image} 
                            alt={post.alt} 
                            width={0}
                            height={0}
                            className="rounded-t-lg object-cover w-full h-full"/>
                    </div>
                    <div className="p-6">
                        <div className="text-muted text-sm flex justify-end mb-4">{post.date}</div>
                        <h3><Link href={post.link}>{post.title}</Link></h3>
                    </div>
                    </article>
                </SwiperSlide>
                )}   
            </Swiper>
        </div>
    )
}