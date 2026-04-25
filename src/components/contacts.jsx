import React from 'react'
import Tiny_card from './tiny_card'

const usernames = ['dog_lover', 'adiarra073', 'canine_king', 'stan_mc', 'damon0302'];

const contacts = () => {
    return (
        <div className='flex flex-col gap-4 w-full'>
            {/* Current user profile */}
            <div className='flex justify-between items-center mb-4'>
                <Tiny_card name="adiarra073" username="Aditya Arora" /> 
                <span className='text-blue-400 text-xs font-semibold cursor-pointer'>Switch</span>
            </div>
            
            <div className='flex justify-between items-center px-2'>
                <span className='text-gray-500 font-semibold text-sm'>Suggested for you</span>
                <span className='text-white text-xs font-semibold cursor-pointer hover:text-gray-400'>See all</span>
            </div>

            {/* Suggestions */}
            <div className='flex flex-col gap-1'>
                {usernames.filter(n => n !== 'adiarra073').map((name, index) => (
                    <div key={index} className='flex justify-between items-center'>
                        <Tiny_card name={name} username="Suggested for you" />
                        <span className='text-blue-400 text-xs font-semibold cursor-pointer'>Follow</span>
                    </div>
                ))}
            </div>

            <div className='text-gray-600 text-[11px] mt-8 px-2'>
                <p>About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified</p>
                <p className='mt-4'>© 2026 INSTAGRAM FROM META</p>
            </div>
        </div>
    )
}

export default contacts