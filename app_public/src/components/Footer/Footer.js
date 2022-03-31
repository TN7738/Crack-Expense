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
          <div className='vl'></div>
          <li>
            <a href='./contact'>About us</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;
