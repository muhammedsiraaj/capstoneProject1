import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
              <img className='logo' src={assets.logo_2} alt="" />
              <p>BiteBox is your ultimate destination for satisfying your cravings with a wide variety of delicious meals. We are committed to delivering fresh, high-quality food straight to your doorstep with care and convenience, ensuring an exceptional dining experience every time.</p>
              <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
              </div>
        </div>
        <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                  <li>Home</li>
                  <li>About us</li>
                  <li>Delivery</li>
                  <li>Privacy policy</li>
                </ul>
        </div>
        <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                <li>+91 95 4400 2853</li>
                <li>contact@bitebox.com</li>
                </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 © bitebox.com - All rights reserved</p>
    </div>
  )
}

export default Footer
