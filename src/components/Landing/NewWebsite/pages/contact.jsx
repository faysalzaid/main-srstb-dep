import React, { useEffect } from 'react';
import Navbar from '../../nComponents/navbar';
import Banner from '../../nComponents/banner';
import Footer from '../../nComponents/footer';

function Contact()
{
    useEffect(() =>
    {
        document.title = 'Contact'
    })
    return (
        <>
            <Navbar />
            <Banner title="CONTACT US" subtitle="LET'S STAY IN TOUCH!" />
            <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2">
                <div className="mx-auto w-full px-4">
                    <h2 className="font-bold  text-2xl my-4">SEND US A MESSAGE</h2>
                    <form className="w-full px-8 pt-6 pb-8 mb-4">
                        <div className="mb-8 grid grid-cols-2 gap-4">
                            <input className="text-xs appearance-none border-slate-200 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="YOUR NAME" />
                            <input className="text-xs appearance-none border-slate-200 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="YOUR EMAIL" />
                        </div>
                        <div className="mb-8">
                            <input className="text-xs appearance-none border-slate-200 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="subject" type="text" placeholder="SUBJECT" />
                        </div>
                        <div className="mb-6">
                            <textarea className="text-xs appearance-none border-slate-200 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" rows="10" id="message" placeholder="YOUR MESSAGE"></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-orange-500 block w-full hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-3/4 mx-auto">
                    <h3 className='font-bold text-2xl my-4'>CONTACT INFORMATION</h3>
                    <div className="border-b">
                        <p className='mb-2 mt-3  font-bold'>0912131415</p>
                        <p className='py-2 text-sm text-slate-400'>PHONE NUMBER</p>
                    </div>
                    <div className="border-b">
                        <p className='mb-2 mt-3  font-bold'>info@company.com</p>
                        <p className='py-2 text-sm text-slate-400'>EMAIL ADDRESS</p>
                    </div>
                    <div className="border-b">
                        <p className='mb-2 mt-3  font-bold'>123 Street, Jigjiga, Somali,ET</p>
                        <p className='py-2 text-sm text-slate-400'>STREET ADDRESS</p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto">
                <div className="mapouter ">
                    <div className="gmap_canvas">
                        <iframe width="1080" height="500" className='w-full mx-auto' id="gmap_canvas"
                            src="https://maps.google.com/maps?q=jigjiga&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            frameBorder="0" scrolling="no"
                            marginHeight="0" marginWidth="0">
                        </iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;