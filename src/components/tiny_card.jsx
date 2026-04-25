import React, { useState, useEffect } from 'react'

const tiny_card = ({ name, username }) => {
    const [dogImage, setDogImage] = useState("")

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(data => setDogImage(data.message))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='flex items-center gap-3 p-2 cursor-pointer'>
            <div 
                className='w-11 h-11 rounded-full bg-cover bg-center border border-gray-800' 
                style={{ backgroundImage: `url(${dogImage || '/assets/profile.png'})` }}
            ></div>
            <div className='flex flex-col'>
                <span className='text-white text-[14px] font-semibold hover:text-gray-400'>{name}</span>
                <span className='text-gray-500 text-[12px]'>{username}</span>
            </div>
        </div>
    )
}

export default tiny_card