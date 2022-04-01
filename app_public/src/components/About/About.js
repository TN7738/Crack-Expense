import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./about.scss";
const about = () => {
    return (
        <div className='aboutus-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <h2 className='heading'>Our Team</h2>
                    <div className='row'>
                        <div className='column'>
                            <div className='card'>
                                <img src='images/team1.jpg' alt='team-member1' />
                                <div className='container'>
                                    <h2 className='member-name'>Tejas<br />Nashikkar</h2>
                                    <p><button className='button'><a href='https://tejasnashikkar.xyz/'>Contact</a></button></p>
                                </div>
                            </div>
                        </div>

                        <div className='column'>
                            <div className='card'>
                                <img src='images/team2.jpeg' alt='team-member2' />
                                <div className='container'>
                                    <h2 className='member-name'>Dhruvi<br />Patel</h2>
                                    <p><button className='button'><a href='https://dhruvipatel.xyz/'>Contact</a></button></p>
                                </div>
                            </div>
                        </div>

                        <div className='column'>
                            <div className='card'>
                                <img src='images/team3.jpeg' alt="team-member3" />
                                <div className='container'>
                                    <h2 className='member-name'>Parth<br />Donga</h2>
                                    <p><button className='button'><a href='http://parthdonga.com/'>Contact</a></button></p>
                                </div>
                            </div>
                        </div>

                        <div className='column'>
                            <div className='card'>
                                <img src='images/team2.png' alt="team-member4" />
                                <div className='container'>
                                    <h2 className='member-name'>Sandhya<br />Paghdar</h2>
                                    <p><button className='button'><a href='http://sandhyapaghdar.com/'>Contact</a></button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default about;
