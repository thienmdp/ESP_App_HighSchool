import { IoSendSharp } from 'react-icons/io5'

export default function InputMessenger() {
  return (
    <div className='flex items-center justify-between h-12 bg-white InputMessenger'>
      <input type='text' placeholder='Type a message...' className='w-full h-full pl-4 bg-transparent' />
      <button className='items-center px-4 py-1 text-2xl'>
        <IoSendSharp />
      </button>
    </div>
  )
}
