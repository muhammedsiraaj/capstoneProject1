import React from 'react'
import './Sidebar.css'
import addIcon from '../../assets/add.png'
import listItem from '../../assets/list.png'
import order from '../../assets/online-order.png'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src= {addIcon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <img src= {listItem} alt="" />
          <p>List Items</p>
        </NavLink >
        
        <NavLink to='/orders' className="sidebar-option">
          <img src= {order} alt="" />
          <p>Orders</p>
        </NavLink >
      </div>
    </div>
  )
}

export default Sidebar
