import React from 'react'
import Story from "./story"

const usernames = ['dog_lover', 'adiarra073', 'canine_king', 'stan_mc', 'damon0302'];

const story_bar = () => {
    return (
        <div className='w-full py-6 bg-black overflow-x-auto no-scrollbar'>
            <div className='flex items-center gap-4 px-4'>
                {usernames.map((name, index) => (
                    <Story key={index} name={name} />
                ))}
            </div>
        </div>
    )
}

export default story_bar