'use client'

import { useEffect, useRef } from "react";
import SectionLayout from "../../layouts/SectionLayout";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import '../../styles/Swiper.css';

const posts = [
  {title: 'Iaculis nunc sed augue lacus1.', image: 'images/computer.jpg', alt: 'Computer with coffee', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus2.', image: 'images/computer.jpg', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus3.', image: 'images/computer.jpg', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus4.', image: 'images/computer.jpg', link: '', date: '05.04.2022'},
]


export default function BlogSection() {

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
        <SectionLayout bg="bg-indigo-50" paddings="py-24">
            <h2 className="text-4xl font-extrabold text-center mb-10"> Rhoncus est pellentesque </h2>
              <div className="relative px-20">
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
                <Swiper
                  breakpoints={breakpoints}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination, Navigation]}>
                  {posts.map(post => 
                    <SwiperSlide key={post.title} className="pb-4">
                      <article className="bg-white rounded-b-lg shadow-md">
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