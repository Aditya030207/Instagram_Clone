import React from 'react'
import Card from './card'

const usernames = ['dog_lover', 'adiarra073', 'canine_king', 'stan_mc', 'damon0302'];
const likesList = [124, 89, 432, 91, 560];

const body = () => {
    return (
        <div className='w-full flex flex-col items-center py-5'>
            {usernames.map((name, index) => (
                <Card key={index} name={name} likes={likesList[index]} />
            ))}
        </div>
    )
}

export default body