import React, { useEffect } from 'react';
import Navbar from '../../nComponents/navbar';
import Banner from '../../nComponents/banner';
import Footer from '../../nComponents/footer';
import BlogContent from '../../nComponents/blogContent';
import SideNav from '../../nComponents/sideNav';
import { Link } from 'react-router-dom';
function Blogs()
{
    useEffect(() =>
    {
        document.title = 'Blogs'
    })
    return (
        <>
            <Navbar />
            <Banner title="RECENT POSTS" subtitle="OUR RECENT BLOG ENTRIES" />
            <div className="max-w-[1240px] px-4 container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="mx-auto mt-3 md:max-w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <BlogContent />
                            <BlogContent />
                            <BlogContent />
                        </div>
                        <Link className='btn bg-orange-500 hover:bg-orange-600 text-center block  text-white w-full py-3 px-4 mb-4'>VIEW ALL POSTS</Link>
                    </div>
                    <SideNav />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Blogs;