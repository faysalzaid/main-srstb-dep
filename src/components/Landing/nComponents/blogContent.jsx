import React, { useEffect, useState } from 'react';
import Img from '../../../assets/img/carousalImg.jpg';
import { Link } from 'react-router-dom';
import { AiFillTags } from 'react-icons/ai';
import { BsFillShareFill } from 'react-icons/bs';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import { url } from 'constants';
import { Button } from '@mui/material';
function BlogContent()
{

    const [blogs,setBlogs] = useState([])
    
    useEffect(()=>{
        const getData=async()=>{
           await axios.get(`${url}/blog`).then((resp)=>{
                if(resp.data.error){
                    console.log(resp.data.error);
                }
                const sortedItems = resp.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBlogs(sortedItems.slice(0,3))
                // console.log(resp.data);
            })
        }

        getData()
    },[])

    return (
        <>

            {blogs.map((blog)=>
            
            <div className="container border mb-4" key={blog?.id}>
                <img className="max-h-96 w-full" src={blog?.image} alt="" />
                <div className="mx-auto px-8 py-4">
                    <h3 className='text-left text-2xl pb-2 text-blue-500 font-bold'>{blog?.title}</h3>
                    <Link to='/blog' className='text-left text-lg font-bold'>{ReactHtmlParser(blog?.description.slice(0,20))}</Link>
                    <ul className='text-xs flex pt-4 border-b pb-4'>
                        <li><p className='text-xs border-0 pr-2 border-r-2'>{blog?.user}</p></li>
                        <li><p className='text-xs px-1 border-0'>{blog?.date}</p></li>
                        {/* <li><p className='text-xs px-1'>12 comments</p></li> */}
                    </ul>
                    <div className="desc py-4 text-sm border-b">
                        <p>{ReactHtmlParser(blog?.description?.slice(0,150))}</p> <Button>Read More</Button>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <div className='flex items-center justify-center'>
                            <AiFillTags className='text-orange-500 mr-2' />
                            <span>Nature, Hiking</span>
                        </div>
                        <div className='flex items-center justify-center'>
                            <BsFillShareFill className='text-orange-500 mr-2' />
                            <span>Facebook, Twitter</span>
                        </div>
                    </div>
                </div>
            </div>
            
            )}
        </>
    );
}

export default BlogContent;