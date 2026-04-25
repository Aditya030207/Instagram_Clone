import React, { useState } from 'react'

const card = () => {
    const [day, setDay] = useState(1)
    const [likes, setLikes] = useState(7.7)
    const [comments, setComments] = useState(453)
    const [retweet, setRetweet] = useState(116)
    const [name, setName] = useState("cat_guy99")
    const [comm, setComm] = useState("In June 2025 a 19 year old named Clélia Verdier from Lyon France was placed into a medically induced coma following a serious attempt at taking her life. She was unconscious for three weeks.")
  return (
    <div className='flex flex-col justify-center items-center gap-3 w-110'>
        <div className='w-110 h-fit flex justify-between items-center px-4'>
            <div className='flex justify-between items-center gap-2'>
                <div className='bg-cover bg-center bg-[url(/assets/profile.png)] w-10 h-10 rounded-full'></div>
                <span className='text-white'>{name}</span>
                <i className='fa-solid fa-circle-check text-blue-400'></i>
                <span className='text-gray-400'>•</span>
                <span className='text-gray-400'>{day} d</span>
            </div>
            <div>
                <i className='text-gray-300 fa-solid fa-ellipsis'></i>
            </div>
        </div>

        <div className='w-110 h-130 bg-gray-800 m-5 rounded-xl'></div>
      
        <div className='flex justify-between items-center w-full px-4'>
            <div className='flex justify-center items-center gap-5 text-lg'>
                <div className='flex justify-center items-center gap-1'>
                    <i className='text-white  fa-regular fa-heart'></i>
                    <p className='text-white'>{likes}K</p>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <i className='text-white  fa-regular fa-comment'></i>
                    <p className='text-white'>{comments}</p>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <i className='text-white  fa-solid fa-retweet'></i>
                    <p className='text-white'>{retweet}</p>
                </div>
                <i className='text-white  fa-regular fa-paper-plane'></i>
            </div>    

            <i className='text-white text-xl fa-regular fa-bookmark hover:fa-solid' ></i>    
        </div>
      
        <div className='text-white w-full h-fit px-4 text-sm items-center gap-1'>
                <span className='text-white'>{name}</span>
                <i className='fa-solid fa-circle-check text-blue-400 text-sm pr-2 pl-1'></i>
                <span className='text-white'>{comm}</span>
        </div>

    </div>
  )
}

export default card
// export default {card,name,setName}