import React from 'react'

const sidebar = () => {
  return (
    <div className='w-20 h-screen bg-black text-white text-2xl flex flex-col justify-around items-center gap-1 m-0'>
      <i className='fa-brands fa-instagram  pt-5'></i>
                    <br />
      <i className='fa-solid fa-house'></i>
      <i className='fa-solid fa-film'></i>
      <i className='fa-regular fa-paper-plane'></i>
      <i className='fa-solid fa-search'></i>
      <i className='fa-regular fa-compass'></i>
      <i className='fa-regular fa-heart'></i>
      <i className='fa-regular fa-add'></i>
      <div className="w-10 h-10 bg-gray-400/50 rounded-full bg-cover bg-center bg-[url(/assets/profile.png)]" ></div>
                    <br />
      <i className="fa-solid fa-bars"></i>
      <i className="fa-solid fa-cubes-stacked"></i>
    </div>
  )
}

export default sidebar