import React, { useEffect, useState } from 'react';
import Img from '../../../assets/img/carousalImg.jpg';

import { Link } from 'react-router-dom';
import { AiFillTags } from 'react-icons/ai';
import { BsFillShareFill } from 'react-icons/bs';
import axios from 'axios';
import { url } from 'constants';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import ReactHtmlParser from 'react-html-parser';
function SingleBlog()
{    
    const [blogs,setBlogs] = useState({})
    const {id} = useParams()
    
    useEffect(()=>{
        const getData=async()=>{
           await axios.get(`${url}/blog/${id}`).then((resp)=>{
                if(resp.data.error){
                    console.log(resp.data.error);
                }
                // const sortedItems = resp.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBlogs(resp.data)
                // console.log(resp.data);
            })
        }

        getData()
    },[])


    return (
        <>
            <div className="container border mb-4">
                <img className="max-h-96 w-full" src={blogs.image} alt="" />
                <div className="mx-auto px-8 py-4">
                    <h3 className='text-left text-2xl pb-2 text-orange-500 font-bold'>{blogs?.title}</h3>                    <ul className='text-xs flex pt-4 border-b pb-4'>
                        <li><p className='text-xs border-0 pr-2 border-r-2'>Name</p></li>
                        <li><p className='text-xs px-1 border-0 border-r-2'>May 12, 2023</p></li>
                        <li><p className='text-xs px-1'>12 comments</p></li>
                    </ul>
                    <div className="desc py-4 text-sm border-b">
                        <span className='mb-2'>{ReactHtmlParser(blogs?.description)}</span>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <div className='flex items-center justify-center'>
                            <AiFillTags className='text-orange-500 mr-2' />
                            <span>Category, {blogs?.BlogCategory?.name}</span>
                        </div>
                        <div className='flex items-center justify-center'>
                            <BsFillShareFill className='text-orange-500 mr-2' />
                            <span>Facebook</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleBlog;