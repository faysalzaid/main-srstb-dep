import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Footer()
{
    let year = new Date().getFullYear();
    return (
        <>
            <footer className="mt-8">
                <div className="text-sm max-w-[1240px] mx-auto">
                    <ul className='text-white flex flex-col md:flex-row'>
                        <li className='my-2 md:my-0'><Link className=' border-0 border-none md:border-r-2'>TWITTER</Link></li>
                        <li className='my-2 md:my-0'><Link className=' border-0 border-none md:border-r-2'>FACEBOOK</Link></li>
                        <li className='my-2 md:my-0'><Link className=' border-0 border-none md:border-r-2'>BEHANCE</Link></li>
                        <li className='my-2 md:my-0'><Link className=' border-0 border-none md:border-r-2'>LINKEDIN</Link></li>
                        <li className='my-2 md:my-0'><Link className=''>DRIBBBLE</Link></li>
                    </ul>
                </div>
                <p className='text-white text-center'>Copyright &copy; {year}</p>
            </footer>
        </>
    );
}

export default Footer;