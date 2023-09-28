import React from 'react';
import Img from '../../../assets/img/carousalImg.jpg';

function MembersBox()
{
    return (
        <div className="grids">
            <figure className="effect-lily">
                <img src={Img} alt="img06" />
                <figcaption>
                    <h2>Marwo: Ayaan Cabdi Maxamed</h2>
                    <p>Araarso</p>
                    <p>Af-hayeenka Golaha Xildhibaanada Dawladd Deegaanka Soomaalida</p>
                    <a href="/member">View more</a>
                </figcaption>
            </figure>
        </div>
    );
}

export default MembersBox;