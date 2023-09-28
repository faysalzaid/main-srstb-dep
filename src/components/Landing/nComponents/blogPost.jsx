import React from 'react';
import BlogContent from './blogContent';
import SideNav from '../nComponents/sideNav';
import { Link } from 'react-router-dom';
import '../../../assets/styles/main.css'
function BlogPost()
{
    return (
        <>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="mx-auto mt-3 md:max-w-3/4">
                        <BlogContent />
                        <BlogContent />
                        <BlogContent />
                        <Link className='btn bg-orange-500 hover:bg-orange-600 text-center block  text-white w-full py-3 px-4'>VIEW ALL POSTS</Link>
                    </div>
                    <SideNav/>
                </div>
            </div>
        </>
    );
}

export default BlogPost;