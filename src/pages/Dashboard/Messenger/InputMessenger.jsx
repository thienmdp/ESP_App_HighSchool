import React from 'react'
import { IoSendSharp } from "react-icons/io5";

export default function InputMessenger() {
  return (
  <div className="InputMessenger h-12 bg-white flex items-center justify-between">
    <input type="text" placeholder="Type a message..." className="placeholder-gray-400 h-full w-5/6 pl-4 bg-transparent placeholder-white" />
    <button className="px-10 items-center py-1 text-2xl"> <IoSendSharp /></button>
  </div>

  )
}
