import React from 'react';
import { Link } from 'react-router-dom';
function SideNav()
{
    return (
        <>
            <div className="ml-5 mt-3 px-4 my-4">
                <form action="">
                    <input className='py-3 px-2 w-full text-xs rounded border-slate-200' type="search" name="" id="" placeholder='TYPE TO SEARCH' />
                </form>

                <div className="w-full mx-auto">
                    <h3 className='font-bold text-2xl my-4'>RECENT POSTS</h3>
                    <div className="border-b">
                        <Link className='mb-2 mt-3 hover:text-orange-500 font-bold'>Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</Link>
                        <p className='py-2 text-sm text-slate-400'>May 23, 2023</p>
                    </div>
                    <div className="border-b">
                        <Link className='mb-2 mt-3 hover:text-orange-500 font-bold'>Lorem ipsum dolor sit amet co nsec tetur adipisicing elit.</Link>
                        <p className='py-2 text-sm text-slate-400'>May 23, 2023</p>
                    </div>
                    <div className="border-b">
                        <Link className='mb-2 mt-3 hover:text-orange-500 font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>
                        <p className='py-2 text-sm text-slate-400'>May 23, 2023</p>
                    </div>
                </div>


                <h3 className='my-4 font-bold text-2xl'>CATEGORIES</h3>
                <ul className='list-disc'>
                    <li className='py-2'><Link className='hover:text-orange-500 font-bold text-lg'>Health</Link></li>
                    <li className='py-2'><Link className='hover:text-orange-500 font-bold text-lg'>Nature</Link></li>

                </ul>
                <div className="w-full">
                    <div className="sidebar-item tags">
                        <div className="sidebar-heading">
                            <h2 className='font-bold text-2xl my-4'>Tags</h2>
                        </div>
                        <div className="content">
                            <ul>
                                <li><Link href="#">Lifestyle</Link></li>
                                <li><Link href="#">Creative</Link></li>
                                <li><Link href="#">HTML5</Link></li>
                                <li><Link href="#">Inspiration</Link></li>
                                <li><Link href="#">Motivation</Link></li>
                                <li><Link href="#">PSD</Link></li>
                                <li><Link href="#">Responsive</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SideNav;