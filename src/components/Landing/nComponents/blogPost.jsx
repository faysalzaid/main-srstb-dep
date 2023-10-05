import React, { useEffect, useState } from 'react';
import BlogContent from './blogContent';
import SideNav from '../nComponents/sideNav';
import { Link } from 'react-router-dom';
import '../../../assets/styles/main.css'
import axios from 'axios';
import { url } from 'constants';
function BlogPost()
{



    return (
        <>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="mx-auto mt-3 md:max-w-3/4">
                        <BlogContent />
                    </div>
                    <SideNav/>
                </div>
            </div>
        </>
    );
}

export default BlogPost;