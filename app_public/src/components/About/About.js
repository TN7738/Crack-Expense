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
                    <ul className='row'>
                        <li className='column'>
                            <div className='card'>
                                <img src='images/team1.jpg' alt='team-member1' />
                                <div className='container'>
                                    <h2 className='member-name'>Tejas<br />Nashikkar</h2>
                                    <p className='eml'>Email:<br /><a mailto="nashikkar.tejas@gmail.com">nashikkar.tejas@gmail.com</a></p>
                                    <p><a className='button' href='https://tejasnashikkar.xyz/'>Contact</a></p>
                                </div>
                            </div>
                        </li>

                        <li className='column'>
                            <div className='card'>
                                <img src='images/team2.jpeg' alt='team-member2' />
                                <div className='container'>
                                    <h2 className='member-name'>Dhruvi<br />Patel</h2>
                                    <p className='eml'>Email:<br /><a mailto="dhruvipatel1667@gmail.com">dhruvipatel1667@gmail.com</a></p>
                                    <p><a className='button' href='https://dhruvipatel.xyz/'>Contact</a></p>
                                </div>
                            </div>
                        </li>

                        <li className='column'>
                            <div className='card'>
                                <img src='images/team3.jpeg' alt="team-member3" />
                                <div className='container'>
                                    <h2 className='member-name'>Parth<br />Donga</h2>
                                    <p className='eml'>Email:<br /><a mailto="dongaparth2@gmail.com">dongaparth2@gmail.com</a></p>
                                    <p><a className='button' href='http://parthdonga.com/'>Contact</a></p>
                                </div>
                            </div>
                        </li>

                        <li className='column'>
                            <div className='card'>
                                <img src='images/team4.jpeg' alt="team-member4" />
                                <div className='container'>
                                    <h2 className='member-name'>Sandhya<br />Paghdar</h2>
                                    <p className='eml'>Email:<br /><a mailto="sandhyapatel848@gmail.com">sandhyapatel848@gmail.com</a></p>
                                    <p><a className='button' href='http://sandhyapaghdar.com/'>Contact</a></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default about;
