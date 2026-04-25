import React, { useState, useEffect } from 'react'

const sidebar = () => {
    const [dogImage, setDogImage] = useState("")

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(data => setDogImage(data.message))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='w-20 h-screen bg-black text-white flex flex-col items-center py-10 gap-8'>
            <i className='fa-brands fa-instagram text-3xl mb-4'></i>
            
            <i className='fa-solid fa-house text-2xl cursor-pointer hover:scale-110 transition-transform'></i>
            <i className='fa-solid fa-search text-2xl cursor-pointer hover:scale-110 transition-transform'></i>
            <i className='fa-regular fa-compass text-2xl cursor-pointer hover:scale-110 transition-transform'></i>
            <i className='fa-solid fa-film text-2xl cursor-pointer hover:scale-110 transition-transform'></i>
            <i className='fa-regular fa-paper-plane text-2xl cursor-pointer hover:scale-110 transition-transform'></i>
            <i className='fa-regular fa-heart text-2xl cursor-pointer hover:scale-110 transition-transform'></i>
            <i className='fa-regular fa-square-plus text-2xl cursor-pointer hover:scale-110 transition-transform'></i>
            
            <div 
                className="w-8 h-8 rounded-full bg-cover bg-center cursor-pointer border border-gray-800" 
                style={{ backgroundImage: `url(${dogImage || '/assets/profile.png'})` }}
            ></div>
            
            <div className='mt-auto flex flex-col gap-8 pb-10'>
                <i className="fa-solid fa-bars text-2xl cursor-pointer hover:scale-110 transition-transform"></i>
            </div>
        </div>
    )
}

export default sidebar