import React from 'react';
import Img from '../../../assets/img/carousalImg.jpg'
function MemberDetail()
{
    return (
        <>
            <div className='max-w-[1240px] mx-auto px-4'>
                <h3 className="py-4 px-2 my-6 font-bold text-white bg-orange-500">Marwo: Ayaan Cabdi Maxamed</h3>
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div className="bg-orange-500 w-full h-auto member_img_cont">
                        <img id='member_img' src={Img} alt="" />
                    </div>
                    <div className="flex items-center justify-center w-full h-auto p-5">
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Ipsam earum numquam, at
                            quisquam quidem aperiam dolore est totam
                            nihil molestiae ducimus expedita eligendi
                            natus velit, consectetur facere voluptatum
                            deserunt! Ipsum odio facere, expedita fugiat
                            incidunt consequuntur laboriosam sequi
                            officia, ullam laborum reiciendis consectetur
                            harum explicabo? Est neque corrupti
                            blanditiis, praesentium sint consequatur
                            officia voluptatibus id excepturi voluptates
                            magni asperiores amet, tenetur laboriosam
                            corporis sit modi iste vitae! Incidunt ex
                            doloribus, sed maiores eum numquam molestiae
                            cumque quae hic dolorem voluptatem repellat,
                            odit, omnis corporis asperiores consequatur
                            debitis! Fuga, ipsam in. Voluptatibus nulla
                            non perspiciatis reprehenderit, reiciendis
                            commodi libero saepe rerum.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberDetail;