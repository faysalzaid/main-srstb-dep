import React, { useEffect } from 'react';
import NavBar from '../../nComponents/navbar';
import Carousal from '../../nComponents/carousal';
import BlogPost from '../../nComponents/blogPost';
import Footer from '../../nComponents/footer';


function Home()
{
    useEffect(() =>
    {
        document.title = 'Home';
    })
    return (
        <>
            <NavBar/>
            <Carousal />
            <div className='max-w-[1240px] mx-auto p-4'>
                <BlogPost />
            </div>
            
            <Footer/>
        </>
    );
}

export default Home;