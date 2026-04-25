import React, { useState, useEffect } from 'react'

const card = ({ name, likes }) => {
    const [day, setDay] = useState(Math.floor(Math.random() * 5) + 1)
    const [comments, setComments] = useState(Math.floor(Math.random() * 500) + 50)
    const [retweet, setRetweet] = useState(Math.floor(Math.random() * 200) + 10)
    const [comm, setComm] = useState("In June 2025 a 19 year old named Clélia Verdier from Lyon France was placed into a medically induced coma following a serious attempt at taking her life. She was unconscious for three weeks.")
    
    const [dogImage, setDogImage] = useState("")

    useEffect(() => {
        // Fetch one dog image to be used for both profile and post
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(data => setDogImage(data.message))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='flex flex-col w-[470px] mb-8 border-b border-gray-800 pb-4'>
            {/* Header */}
            <div className='flex justify-between items-center py-3'>
                <div className='flex items-center gap-2'>
                    <div 
                        className='w-8 h-8 rounded-full bg-cover bg-center border border-gray-700' 
                        style={{ backgroundImage: `url(${dogImage || '/assets/profile.png'})` }}
                    ></div>
                    <div className='flex items-center gap-1'>
                        <span className='text-white font-semibold text-[14px] hover:text-gray-400 cursor-pointer'>{name}</span>
                        <i className='fa-solid fa-circle-check text-blue-500 text-[12px]'></i>
                        <span className='text-gray-500 text-[14px]'>•</span>
                        <span className='text-gray-500 text-[14px]'>{day}d</span>
                    </div>
                </div>
                <i className='text-white fa-solid fa-ellipsis cursor-pointer'></i>
            </div>

            {/* Post Image */}
            <div className='w-full rounded-[4px] overflow-hidden border border-gray-800'>
                <img 
                    src={dogImage} 
                    alt="post" 
                    className='w-full h-auto object-cover'
                    style={{ minHeight: '300px' }}
                />
            </div>
          
            {/* Interactions */}
            <div className='flex justify-between items-center w-full py-3'>
                <div className='flex items-center gap-4 text-2xl'>
                    <div className='flex items-center gap-1.5'>
                        <i className='text-white fa-regular fa-heart cursor-pointer hover:text-gray-500'></i>
                        <span className='text-white text-[14px] font-semibold'>{likes}</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <i className='text-white fa-regular fa-comment cursor-pointer hover:text-gray-500'></i>
                        <span className='text-white text-[14px] font-semibold'>{comments}</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <i className='text-white fa-solid fa-retweet cursor-pointer hover:text-gray-500'></i>
                        <span className='text-white text-[14px] font-semibold'>{retweet}</span>
                    </div>
                    <i className='text-white fa-regular fa-paper-plane cursor-pointer hover:text-gray-500'></i>
                </div>    
                <i className='text-white text-2xl fa-regular fa-bookmark cursor-pointer hover:text-gray-500' ></i>    
            </div>
          
            {/* Caption */}
            <div className='text-white text-[14px]'>
                <p>
                    <span className='font-semibold mr-2 cursor-pointer hover:text-gray-400'>{name}</span>
                    <span className='text-white leading-5'>{comm}</span>
                </p>
                <p className='text-gray-500 text-[13px] mt-2 cursor-pointer'>View all {comments} comments</p>
            </div>
        </div>
    )
}

export default card