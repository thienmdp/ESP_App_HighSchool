import InputMessenger from './InputMessenger'
import MessageMessenger from './MessageMessenger'

export default function ChatMessenger() {
  return (
    <div className='flex-col ChatMessenger'>
      <div className='justify-center w-full text-2xl font-bold text-white bg-green-600 ChatInfo'>
        <span>Name User </span>
      </div>
      <div className='MessagesMessenger bg-green-300 p-4 text-lg overflow-y-auto max-h-[calc(100vh-222px)] mb-1'>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <MessageMessenger key={index} />
          ))}
      </div>
      <InputMessenger />
    </div>
  )
}
