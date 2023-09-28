import React, { useEffect } from 'react';
import Navbar from '../../nComponents/navbar';
// import Banner from '../components/banner';
import Banner from '../../nComponents/banner'
import Footer from '../../nComponents/footer';
// import Img from '../../ass/carousalImg.jpg';
import Img from '../../../../assets/img/carousalImg.jpg'
import BoxDesc from '../../nComponents/boxDesc';
function About()
{
    useEffect(() =>
    {
        document.title = 'About Us'
    })
    return (
        <>
            <Navbar/>
            <Banner title="ABOUT US" subtitle="MORE ABOUT US!"/>
            <div className='about-us container mx-auto max-w-[1240px]'>
                <div className="w-full mx-auto px-4">
                    <img src={Img} alt="" />
                    <p>Please tell your friends about TemplateMo website.
                        Thank you. You can browse through different
                        categories of templates such as etc. Pellentesque
                        quis luctus libero. Maecenas pretium molestie erat,
                        ac tincidunt leo gravida ac. Cras ullamcorper eu
                        ipsum eu sollicitudin. Fusce vitae commodo turpis.
                        Integer ullamcorper purus nec justo mollis fermentum.
                        Nunc imperdiet erat nec lacinia laoreet. <br /> <br />

                        Maecenas faucibus ullamcorper felis vitae finibus. Nullam at quam ut lacus aliquam tempor vel sed ipsum. Donec pellentesque tincidunt imperdiet. Mauris sit amet justo vulputate, cursus massa congue, vestibulum odio. Aenean elit nunc, gravida in erat sit amet, feugiat viverra leo. Phasellus interdum, diam commodo egestas rhoncus, turpis nisi consectetur nibh, in vehicula eros orci vel neque.</p>

                </div>

                <div className="about-box">
                    <BoxDesc/>
                    <BoxDesc/>
                </div>
                <div className="about-box">
                    <BoxDesc/>
                    <BoxDesc/>
                    <BoxDesc/>
                </div>
                <div className="about-box">
                    <BoxDesc/>
                    <BoxDesc/>
                    <BoxDesc/>
                    <BoxDesc/>
                </div>

            
            </div>
            <Footer />
        </>
    );
}

export default About;;