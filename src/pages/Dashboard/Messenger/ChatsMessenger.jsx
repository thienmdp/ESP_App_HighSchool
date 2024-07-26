export default function ChatsMessenger() {
  return (
    <div className='ChatsMessenger'>
      <div className='px-1 py-4 UserChat hover:bg-green-700 '>
        <img
          src='https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
        <div className='UserChatInfo'>
          <span className='text-xl text-white '>user</span>
          <p className='text-gray-200'>new message</p>
        </div>
      </div>

      <div className='px-1 py-4 UserChat hover:bg-green-700 '>
        <img
          src='https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
        <div className='UserChatInfo'>
          <span className='text-xl text-white '>user</span>
          <p className='text-gray-200'>new message</p>
        </div>
      </div>
      <div className='px-1 py-4 UserChat hover:bg-green-700 '>
        <img
          src='https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
        <div className='UserChatInfo'>
          <span className='text-xl text-white '>user</span>
          <p className='text-gray-200'>new message</p>
        </div>
      </div>
    </div>
  )
}
