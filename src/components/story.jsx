import React from 'react'

const story = () => {
  return (
      <div className='w-[82px] h-[82px] rounded-full flex justify-center items-center bg-linear-to-tr from-yellow-400 via-orange-500 via-pink-500 to-purple-600 gap-10'>
       <div className='w-19 h-19 bg-black rounded-full flex justify-center items-center'>
        <div className='bg-cover bg-center bg-[url(/assets/profile.png)] w-[70px] h-[70px] rounded-full'></div>
       </div> 
      </div>
  )
}

export default story