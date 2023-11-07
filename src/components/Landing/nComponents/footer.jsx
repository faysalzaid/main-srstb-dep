import { AuthContext } from 'hooks/authContext';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Footer()
{

    const {authState} = useContext(AuthContext)
    let year = new Date().getFullYear();
    return (
        <>
            <footer className="mt-8">
                <div className="text-sm max-w-[1240px] mx-auto">
                    <ul className='text-white flex flex-col md:flex-row'>
                        <li className='my-2 md:my-0'><a href={'https://www.facebook.com/profile.php?id=100068401939422'} className=' border-0 border-none md:border-r-2'>Facebook</a></li>
                        {authState.state?
                        <li className='my-2 md:my-0'><a href={'/app/dashboard'} className=''>Dashboard</a></li>:                        <li className='my-2 md:my-0'><Link to={'/login'} className=' border-0 border-none md:border-r-2'>System</Link></li>

                        }
                    </ul>
                </div>
                <p className='text-white text-center'>Copyright &copy; {year}</p>
            </footer>
        </>
    );
}

export default Footer;