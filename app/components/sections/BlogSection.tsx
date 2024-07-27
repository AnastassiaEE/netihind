'use client'

import SectionLayout from "../../layouts/SectionLayout";
import image from "../../../public/images/computer.jpg";
import SliderCard from "../ui/blog/SliderCard";
import { SwiperSlide } from 'swiper/react';
import Slider from "../ui/blog/Slider";

const posts = [
  {title: 'Iaculis nunc sed augue lacus1.', image: image, alt: 'Computer with coffee', href: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus2.', image: image, alt: 'Computer with coffee', href: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus3.', image: image, alt: 'Computer with coffee', href: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus4.', image: image, alt: 'Computer with coffee', href: '', date: '05.04.2022'},
]

export default function BlogSection() {
    return (
        <SectionLayout bg="bg-neutral-light" paddings="py-24">
            <h2 className="text-4xl font-extrabold text-center mb-10"> Rhoncus est pellentesque </h2>
            <Slider>
                {posts.map(post => 
                    <SwiperSlide key={post.title} className="pb-4 !h-auto">
                        <SliderCard 
                            href={post.href}
                            src={post.image}
                            alt={post.alt}>
                            <>{post.date}</>
                            <>{post.title}</>
                        </SliderCard>
                    </SwiperSlide>
                )}   
            </Slider>   
        </SectionLayout>
    )
}