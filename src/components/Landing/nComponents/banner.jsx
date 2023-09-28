import React from 'react';
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
function Banner(props)
{
    return (
        <>
                 <Swiper
                spaceBetween={30}
                centeredSlides={false}
                loop={false}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: false,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper banner"
            >
                <SwiperSlide>
                    <div className="slide-container ">
                        <img src={Img} className="" alt="..." />
                        <div className="text max-w-[1240px] mx-auto">
                            <p className='text-left text-2xl md:text-3xl text-orange-500 font-bold'>{props.title}</p>
                            <h2 className='text-left text-3xl py-3 md:text-4xl text-white'>{props.subtitle}</h2>
                        </div>
                    </div>
                </SwiperSlide>
            
            </Swiper>
        </>
    );
}

export default Banner;