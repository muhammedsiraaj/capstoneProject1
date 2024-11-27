import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        {/* <h2>Delicious food, just a click away</h2> */}
        <h2>order.eat.repeat</h2>
        <p>Welcome to BiteBox, where fresh, flavorful dishes meet effortless dining. From quick snacks to hearty meals, we deliver happiness right to your door – one bite at a time!</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
