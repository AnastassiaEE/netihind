'use client'

import { useEffect, useRef, useState } from "react";
import SectionLayout from "../../layouts/SectionLayout";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';

const posts = [
  {title: 'Iaculis nunc sed augue lacus1.', image: 'images/computer.jpg', alt: 'Computer with coffee', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus2.', image: 'images/computer.jpg', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus3.', image: 'images/computer.jpg', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus4.', image: 'images/computer.jpg', link: '', date: '05.04.2022'},
]

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
 shadow-zinc-900/30`;

const hoveredArrowStyle = 
`!bg-indigo-500\
 !shadow-indigo-500/50`;

export default function BlogSection() {

    const [leftArrowIsHovered, setLeftArrowIsHovered] = useState(false);
    const [rightArrowIsHovered, setRightArrowIsHovered] = useState(false);

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

    const handleArrowHover = arrow => arrow === 'left'? setLeftArrowIsHovered(true): setRightArrowIsHovered(true);
    const handleArrowLeave = arrow => arrow === 'left'? setLeftArrowIsHovered(false): setRightArrowIsHovered(false);

    return (
        <SectionLayout bg="bg-indigo-50" paddings="py-24">
            <h2 className="text-4xl font-extrabold text-center mb-10"> Rhoncus est pellentesque </h2>
              <div className="relative px-20">
                <div className={`prev ${baseArrowStyle} ${leftArrowIsHovered && hoveredArrowStyle} absolute left-0 top-1/2 -translate-y-1/2`} 
                     onMouseEnter={() => handleArrowHover('left')}
                     onMouseLeave={() => handleArrowLeave('left')}>
                      <img src={leftArrowIsHovered ? 'images/white_arrow.png': 'images/black_arrow.png'} alt="Accordion item button arrow" className="rotate-90 transition-all w-1/3"/>
                </div>
                <div className={`next ${baseArrowStyle} ${rightArrowIsHovered && hoveredArrowStyle} absolute right-0 top-1/2 -translate-y-1/2`} 
                     onMouseEnter={() => handleArrowHover('right')}
                     onMouseLeave={() => handleArrowLeave('right')}>
                      <img src={rightArrowIsHovered ? 'images/white_arrow.png': 'images/black_arrow.png'} alt="Accordion item button arrow" className="-rotate-90 transition-all w-1/3"/>
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
                    bulletClass: 'pagination-bullet bg-zinc-400 inline-block rounded-lg cursor-pointer w-1.5 h-1.5 mx-1.5',
                    bulletActiveClass: 'pagination-bullet-active !bg-indigo-500 !w-6',
                  }}
                  modules={[Pagination, Navigation]}>
                  {posts.map(post => 
                    <SwiperSlide key={post.title} className="pb-4 !h-auto">
                      <article className="bg-white rounded-lg shadow-md h-full">
                        <div className="relative w-full h-60">
                          <a href={post.link} className="absolute w-full h-full"></a>
                          <img src={post.image} alt={post.alt} className="rounded-t-lg object-cover w-full h-full" />
                        </div>
                        <div className="p-6">
                          <div className="text-gray-400 text-sm flex justify-end mb-4">{post.date}</div>
                          <h3><a href={post.link}>{post.title}</a></h3>
                        </div>
                      </article>
                    </SwiperSlide>
                  )}   
                </Swiper>
              </div>
            
        </SectionLayout>
    )
}