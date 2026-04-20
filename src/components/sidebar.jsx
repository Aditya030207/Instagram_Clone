import React, { useState } from 'react'
import './sidebar.css'

const sidebar = () => {
  const [isHover, SetIsHover] = useState(false)

  return (
    <div className='sidebar-container'
    onMouseEnter={()=>{SetIsHover(true)}}
    onMouseLeave={()=>{SetIsHover(false)}}
    // style={{
      // width: isHover ? '30vw' : '10vw',
      // alignItems: isHover ? 'start':'center',
      // }}
    >
      <div className="fa-brands fa-instagram"></div>
      <br />
      <div className='fa-solid fa-house'></div>
      <div className='fa-solid fa-film'></div>
      <div className='fa-solid fa-paper-plane'></div>
      <div className='fa-solid fa-search'></div>
      <div className='fa-solid fa-compass'></div>
      <div className='fa-solid fa-heart'></div>
      <div className='fa-solid fa-add'></div>
      <br />
      <div className="fa-solid fa-bars"></div>
      <div className="fa-solid fa-cubes-stacked"></div>
    </div>
  ) 
}

export default sidebar