import React from 'react'
import Tiny_card from './tiny_card'

const contacts = (prop) => {
  return (
    <div className='w-110 h-fit flex flex-col justify-center items-center p-5 '>
        <Tiny_card /> 
        <div className='flex justify-between items-center w-85 p-4'>
            <div className='text-white font-medium text-sm'>
                Suggested for you
            </div>
            <div className='text-white  text-sm'>
                See all
            </div>
        </div>
        <Tiny_card /> 
        <Tiny_card /> 
        <Tiny_card /> 
        <Tiny_card /> 
      </div>
  )
}

export default contacts