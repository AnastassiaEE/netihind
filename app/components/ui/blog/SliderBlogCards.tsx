'use client';

import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CircleArrow from '@/components/ui/icons/CircleArrow';
import SliderBlogCard from '@/components/ui/blog/SliderBlogCard';
import 'swiper/css/bundle';
import classNames from 'classnames';

const arrowClasses = classNames(
  'text-black',
  'bg-white',
  'shadow-md',
  'shadow-black/30',
  'max-xl:hidden',
  'hover:bg-primary',
  'hover:shadow-primary/50',
  'hover:text-white',
);

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

const navigation = {
  nextEl: '.next',
  prevEl: '.prev',
};

const pagination = {
  clickable: true,
  el: '.swiper-pagination',
  bulletClass:
    'pagination-bullet bg-muted inline-block rounded-lg cursor-pointer transition-all duration-500 w-1.5 h-1.5 mx-1.5',
  bulletActiveClass: 'pagination-bullet-active !bg-primary !w-6',
};

const modules = [Pagination, Navigation];

export default function SliderBlogCards({ posts }: { posts?: { [key: string]: any }[] }) {
  return (
    <div className="relative xl:px-20">
      <div className="prev absolute left-0 top-1/2 -translate-y-1/2">
        <CircleArrow direction="left" style={arrowClasses} />
      </div>
      <div className="next absolute right-0 top-1/2 -translate-y-1/2">
        <CircleArrow direction="right" style={arrowClasses} />
      </div>
      <div className="swiper-pagination !-bottom-10"></div>
      <Swiper
        breakpoints={breakpoints}
        navigation={navigation}
        pagination={pagination}
        modules={modules}
      >
        {posts?.map((post) => (
          <SwiperSlide key={post.title} className="pb-4 !h-auto">
            <SliderBlogCard
              href={post.slug}
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText}
              date={post.date}
              title={post.title}
            ></SliderBlogCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
