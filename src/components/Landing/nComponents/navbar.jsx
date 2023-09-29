/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import logo from '../assets/img/srhb.png';


const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [cur, setCur] = useState('');
    const history = useHistory();
    const handleNav = () => {
        setNav(!nav);
    };
    function navigateToHome()
    {
        history.push('/');
    }
    function navigateToAbout()
    {
        history.push('/about');
    }
    function navigateToBlogs()
    {
        history.push('/blogs');
    }
    function navigateToMembers()
    {
        history.push('/members');
    }
    function navigateToContact()
    {
        history.push('/contact');
    }
    useEffect(() =>
    {
        const page = document.title;
        switch (page) {
            case 'Home':
                setCur('Home');
                break;
            case 'About Us':
                setCur('About');
                break;
            case 'Blogs':
                setCur('Blogs');
                break;
            case 'Members':
                setCur('Members');
                break;
            case 'Member':
                setCur('Members');
                break;
            case 'Contact':
                setCur('Contact');
                break;
        }
    })
    return (
        <nav className="gradient bg-white sticky top-0 z-50 shadow-md">
            <div className='nav flex justify-between items-center max-w-[1240px] mx-auto px-4'>
                {/* <img src={logo} /> */}
                <h1 className='text-4xl font-bold'>SRS-Road</h1>
                <ul className='desktop font-bold hidden md:flex'>
                    <li className={cur=='Home'?'p-4 text-lg text-orange-500 cursor-pointer' : 'p-4 text-lg cursor-pointer'}>
                        <a className='text-sm hover:text-orange-500' onClick={navigateToHome}>HOME</a>
                    </li>
                    <li className={cur == 'About' ? 'p-4 text-lg text-orange-500 cursor-pointer' : 'p-4 text-lg cursor-pointer'}>
                        <a className='text-sm hover:text-orange-500'  onClick={navigateToAbout}>ABOUT US</a>
                    </li>
                    <li className={cur == 'Blogs' ? 'p-4 text-lg text-orange-500 cursor-pointer' : 'p-4 text-lg cursor-pointer'}>
                        <a className='text-sm hover:text-orange-500' onClick={navigateToBlogs}>BLOGS</a>
                    </li>
                    <li className={cur == 'Members' ? 'p-4 text-lg text-orange-500 cursor-pointer' : 'p-4 text-lg cursor-pointer'}>
                        <a className='text-sm hover:text-orange-500' onClick={navigateToMembers}>MEMBERS</a>
                    </li>
                    <li className={cur == 'Contact' ? 'p-4 text-lg text-orange-500 cursor-pointer' : 'p-4 text-lg cursor-pointer'}>
                        <a className='text-sm hover:text-orange-500' onClick={navigateToContact}>CONTACT US</a>
                    </li>
                </ul>
                <div onClick={handleNav} className='block md:hidden'>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
                <ul className={nav ? ' mob-nav fixed text-white left-0 top-0 w-[60%] h-full bg-orange-500 ease-in-out duration-500 z-100' : 'hidden ease-in-out duration-500 fixed left-[-100%]'}>

                    <li className='p-4 cursor-pointer border-b border-white-600'>  <a onClick={navigateToHome}>Home</a></li>
                    <li className='p-4 cursor-pointer border-b border-white-600'> <a onClick={navigateToAbout}>About Us</a></li>
                    <li className='p-4 cursor-pointer border-b border-white-600'> <a onClick={navigateToBlogs}>Blogs</a></li>
                    <li className='p-4 cursor-pointer border-b border-white-600'> <a onClick={navigateToMembers}>Members</a></li>
                    <li className='p-4 cursor-pointer'>  <a onClick={navigateToContact}>Contact Us</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;