import React from 'react';
import './homepage.scss';
import Typewriter from "../Typewriter/Typewriter";

const Homepage = () => {
    return (
        <div className="home-wrap">
            <div className='atf-wrap'>
                <div className='grid'>
                    <div className='typewriter'>
                        <Typewriter />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
