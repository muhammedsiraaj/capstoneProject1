import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.avif';


const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={logo} alt="Logo" />
      <img className='profile' src={profile} alt="Profile" />

    </div>
  )
}

export default Navbar
