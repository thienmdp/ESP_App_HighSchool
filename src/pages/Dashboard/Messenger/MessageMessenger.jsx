export default function MessageMessenger() {
  return (
    <div className='MessageMessenger'>
      <div className='MessageInfo'>
        <img
          src='https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
      </div>
      <div className='p-1 mb-2 bg-white rounded-lg MessageContent'>
        <p className='text-base'>
          Message contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage
          contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage
          contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage
          contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage
          contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage contentMessage
          contentMessage content
        </p>
        <p className='flex justify-end w-full text-sm !text-end'>now</p>
      </div>
    </div>
  )
}
