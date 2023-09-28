import React, { useEffect } from 'react';
import Navbar from '../../nComponents/navbar';
import Footer from '../../nComponents/footer';
import BlogDetail from '../../nComponents/blogDetail';
import Banner from '../../nComponents/banner';

function BlogDet()
{
    useEffect(() =>
    {
        document.title = 'Blogs';
    });
    return (
        <>
            <Navbar />
            <Banner title="BLOG DETAIL" subtitle="TITLE OF THE BLOG"/>
            <BlogDetail/>
            <Footer />
        </>
    );
}

export default BlogDet;