import React, { useEffect } from 'react';
import Navbar from '../../nComponents/navbar';
import Footer from '../../nComponents/footer';
import MemberDetail from '../../nComponents/memberDetail';

function MemberDet()
{
    useEffect(() =>
    {
        document.title = 'Members'
    })
    return (
        <>
            <Navbar />
            <MemberDetail/>
            <Footer />
        </>
    );
}

export default MemberDet;