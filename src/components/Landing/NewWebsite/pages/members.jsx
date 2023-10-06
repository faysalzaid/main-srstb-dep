import React, { useEffect, useState } from 'react';
import '../../../../assets/styles/layla.css'
import MembersBox from '../../nComponents/membersBox';
import Navbar from '../../nComponents/navbar';
import Footer from '../../nComponents/footer';
import axios from 'axios';
import { url } from 'constants';
function Members()
{


    useEffect(() =>
    {
        document.title = 'Members';
    });




    return (
        <>
            <Navbar />
            <div className='max-w-[1240px] mx-auto'>
                <h2 className='text-center font-bold text-2xl block border-b-4 border-orange-500 my-4'>Members Of The DDS Council</h2>
                <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 mx-4'>
                <MembersBox />
   
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Members;