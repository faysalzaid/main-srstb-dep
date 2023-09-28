import React from 'react';
import SideNav from './sideNav';
import SingleBlog from './singleBlog';

function BlogDetail()
{
    return (
        <>
            <div className="max-w-[1240px] mx-auto px-4 my-4">
            <div className="max-w-[1240px] px-4 container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="mx-auto mt-3 md:max-w-3/4">
                            <SingleBlog />
                    </div>
                    <SideNav />
                </div>
            </div>
            </div>
        </>
    );
}

export default BlogDetail;