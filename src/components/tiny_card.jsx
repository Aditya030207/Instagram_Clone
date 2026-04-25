import { div } from 'framer-motion/client'
import React, { useState } from 'react'

const tiny_card = () => {
    const [name,setName] = useState("dog_guy23")
    const [username,setUsername] = useState("Jingles")
  return (
      <div className='flex justify-between items-center w-80 p-2'>
          <div className='flex justify-center items-center gap-3'>
            <div className='bg-cover bg-center bg-[url(/assets/profile.png)] w-10 h-10 rounded-full'></div>
            <div className='flex flex-col justify-center items-start gap-1'>
                <span className='text-white text-sm font-medium'>{name}</span>
                <span className='text-gray-400 text-sm '>{username}</span>
            </div>
          </div>
          
          <div className='text-blue-400'>switch</div>
    </div>
  )
}

export default tiny_card