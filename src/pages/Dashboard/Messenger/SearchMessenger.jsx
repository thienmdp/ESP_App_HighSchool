import React from 'react'

export default function SearchMessenger() {
  return (
    <div className='SearchMessenger'>
        <div className='SearchForm'>
          <input  className='w-full h-9 outline-none bg-transparent text-white placeholder-white' type="text" placeholder="Search... "/>
        </div>
      <div className='UserChat py-4 px-1 hover:bg-green-700  '>
          <img src="https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className='UserChatInfo'>
          <span className=' ext-white text-xl'>user</span>
          <p className='text-gray-200'>new message</p>
        </div>
      </div>
    </div>
  )
}
