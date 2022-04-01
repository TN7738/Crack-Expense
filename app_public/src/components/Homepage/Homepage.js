import React from 'react';
import './homepage.scss';
import Typewriter from "../Typewriter/Typewriter";
import Slider from '../Slider/Slider';
import Groups from '../Groups/Groups';

const Homepage = () => {
    return (
        <div className="home-wrap">
            <div className='atf-wrap'>
                <div className='grid'>
                    <Slider />
                    <div className='typewriter'>
                        <Typewriter />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
