import React from 'react'
import styled from 'styled-components'
import MessagesMessenger from './MessagesMessenger'
import InputMessenger from './InputMessenger'


export default function ChatMessenger() {
  return (
    
      <div className='ChatMessenger flex-col'>
          <div className='ChatInfo justify-center bg-green-500 font-bold text-2xl text-white w-full'>
            <span>User </span>
          </div>
          <MessagesMessenger />
          <InputMessenger/>
      </div>
    
  )
}
