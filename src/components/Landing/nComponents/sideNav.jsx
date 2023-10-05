import axios from 'axios';
import { url } from 'constants';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function SideNav()
{



    const [blogs,setBlogs] = useState([])

    
    useEffect(()=>{
        const getData=async()=>{
           await axios.get(`${url}/blog`).then((resp)=>{
                if(resp.data.error){
                    console.log(resp.data.error);
                }
                const sortedItems = resp.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBlogs(sortedItems?.slice(0,9))
                // console.log(resp.data);
            })
        }

        getData()
    },[])


    return (
        <>
            <div className="ml-5 mt-3 px-4 my-4">
                <form action="">
                    <input className='py-3 px-2 w-full text-xs rounded border-slate-200' type="search" name="" id="" placeholder='TYPE TO SEARCH' />
                </form>

                <div className="w-full mx-auto">
                    <h3 className='font-bold text-2xl my-4'>RECENT POSTS</h3>
                    {blogs?.map((blog)=>
                    <div className="border-b" key={blog?.id}>
                        <Link to={`/blog/${blog?.id}`} className='mb-2 mt-3 hover:text-orange-500 font-bold'>{blog?.title}.</Link>
                        <p className='py-2 text-sm text-slate-400'>{blog?.date}</p>
                    </div>
                    )}
                    
                </div>


             
            </div>
        </>
    );
}

export default SideNav;