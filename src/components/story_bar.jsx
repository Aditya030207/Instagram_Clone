import { div } from 'framer-motion/client'
import React from 'react'
import Story from "./story"

const story = () => {
  return (
    <div className='w-full h-30 flex justify-center items-center bg-black'>

    <div className='text-white flex justify-evenly items-center text-5xl w-fit h-full bg-black gap-5'>

      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />

    </div>
      </div>
  )
}

export default story