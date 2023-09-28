import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Img from '../../../assets/img/carousalImg.jpg';

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../assets/styles/main.css";

export default function Carousal()
{
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="slide-container ">
                        <img src={Img} className="" alt="..." />
                        <div className="text max-w-[1240px] mx-auto">
                            <h3 className='text-left text-orange-500 font-bold'>First Slide</h3>
                            <Link className='text-left text-white'>Some representative placeholder content for the Fourth slide.</Link>
                            <ul className='text-white text-sm flex'>
                                <li><p className='text-sm border-0 pr-2 border-r-4'>Name</p></li>
                                <li><p className='text-sm px-2 border-0 border-r-4'>May 12, 2023</p></li>
                                <li><p className='text-sm px-2'>12 comments</p></li>
                            </ul>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-container ">
                        <img src={Img} className="" alt="..." />
                        <div className="text max-w-[1240px] mx-auto">
                            <h3 className='text-left text-orange-500 font-bold'>Second Slide</h3>
                            <Link className='text-left text-white'>Some representative placeholder content for the Fourth slide.</Link>
                            <ul className='text-white text-sm flex'>
                                <li><p className='text-sm border-0 pr-2 border-r-4'>Name</p></li>
                                <li><p className='text-sm px-2 border-0 border-r-4'>May 12, 2023</p></li>
                                <li><p className='text-sm px-2'>12 comments</p></li>
                            </ul>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-container ">
                        <img src={Img} className="" alt="..." />
                        <div className="text max-w-[1240px] mx-auto">
                            <h3 className='text-left text-orange-500 font-bold'>Third Slide</h3>
                            <Link className='text-left text-white'>Some representative placeholder content for the Fourth slide.</Link>
                            <ul className='text-white text-sm flex'>
                                <li><p className='text-sm border-0 pr-2 border-r-4'>Name</p></li>
                                <li><p className='text-sm px-2 border-0 border-r-4'>May 12, 2023</p></li>
                                <li><p className='text-sm px-2'>12 comments</p></li>
                            </ul>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}