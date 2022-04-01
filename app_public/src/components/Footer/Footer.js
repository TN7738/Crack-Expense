import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <div className='footer-wrap'>

      <div className='parent-wrap'>
        <ul>
          <li>
            <a href='./contact'>Contact Us</a>
          </li>
          <li>
            <a href='./about'>About us</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;
