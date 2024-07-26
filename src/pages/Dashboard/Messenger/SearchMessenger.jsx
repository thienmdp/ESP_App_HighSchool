import { BiSearch } from 'react-icons/bi'

export default function SearchMessenger() {
  return (
    <div className='SearchMessenger'>
      <div className='flex items-center SearchForm'>
        <BiSearch className='mr-2 text-xl text-white' />
        <input
          className='w-full text-white placeholder-white bg-transparent outline-none h-9'
          type='text'
          placeholder='Search... '
        />
      </div>
    </div>
  )
}
