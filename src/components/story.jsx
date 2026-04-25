import React, { useState, useEffect } from 'react'

const story = ({ name }) => {
    const [dogImage, setDogImage] = useState("")

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(data => setDogImage(data.message))
            .catch(err => console.error(err));
    }, [])

  return (
      <div className='flex flex-col items-center gap-1'>
          <div className='w-[82px] h-[82px] rounded-full flex justify-center items-center bg-linear-to-tr from-yellow-400 via-orange-500 via-pink-500 to-purple-600'>
           <div className='w-19 h-19 bg-black rounded-full flex justify-center items-center'>
            <div className='bg-cover bg-center w-[70px] h-[70px] rounded-full' style={{ backgroundImage: `url(${dogImage || '/assets/profile.png'})` }}></div>
           </div> 
          </div>
          {name && <span className='text-white text-xs'>{name.length > 10 ? name.substring(0, 8) + '...' : name}</span>}
      </div>
  )
}

export default story