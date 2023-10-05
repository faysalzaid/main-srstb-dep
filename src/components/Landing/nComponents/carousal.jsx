import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ReactHtmlParser from 'react-html-parser';
import Img from '../../../assets/img/carousalImg.jpg';

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../assets/styles/main.css";
import { useEffect } from 'react';
import axios from 'axios';
import { url } from 'constants';

export default function Carousal()
{
    const [blogs,setBlogs] = useState([])
    
    useEffect(()=>{
        const getData=async()=>{
           await axios.get(`${url}/blog`).then((resp)=>{
                if(resp.data.error){
                    console.log(resp.data.error);
                }
                setBlogs(resp.data)
                // console.log(resp.data);
            })
        }

        getData()
    },[])







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
                {blogs.map((blog)=>
                
                <SwiperSlide key={blog?.id}>
                    <div className="slide-container ">
                        <img src={blog?.image} className="" alt="..." />
                        <div className="text max-w-[1240px] mx-auto">
                            <h3 className='text-left text-blue-500 font-bold'>{blog?.title}</h3>
                            <Link to="/" className='text-left text-white'>{ReactHtmlParser(blog?.description.slice(0,20))}</Link>
                            <ul className='text-white text-sm flex'>
                                <li><p className='text-sm border-0 pr-2 border-r-4'>{blog?.user}</p></li>
                                <li><p className='text-sm px-2 border-0'>{blog?.date}</p></li>
                                {/* <li><p className='text-sm px-2'>12 comments</p></li> */}
                            </ul>
                        </div>
                    </div>
                </SwiperSlide>
                
                )}



            </Swiper>
        </>
    );
}