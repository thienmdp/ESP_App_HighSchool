import { useState } from 'react' // Import useState for toggle functionality
import '../Sidebar/Sidebar.css'
import { FaRegMessage } from 'react-icons/fa6'
import { RiMentalHealthLine } from 'react-icons/ri'
import { FaHome, FaRegCalendarAlt } from 'react-icons/fa'
import { FaRegNoteSticky } from 'react-icons/fa6'
import { GiHealing } from 'react-icons/gi'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import path from '../../../constants/path'
import { MdDashboard } from 'react-icons/md'

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false) // Use state to manage active state

  const toggleSidebar = () => {
    setIsActive(!isActive) // Toggle active state on click
  }

  return (
    <div className={`Sidebar h-[100vh] ${isActive ? 'active' : ''}`}>
      <div className='Logo-menu'>
        <h2 className='Logo'>LNA SYSTEM</h2>
      </div>
      <ul className='list'>
        <li className='list-item'>
          <Link to='/' className='flex items-center justify-start w-full'>
            <FaHome className='mr-4 min-w-max' />
            <span className='link-name'>Trang chủ</span>
          </Link>
        </li>
        <li className='list-item'>
          <Link to={path.dashboard} className='flex items-center justify-start w-full'>
            <MdDashboard className='mr-4 min-w-max' />
            <span className='link-name'>Dashboard</span>
          </Link>
        </li>
        <li className='list-item'>
          <Link to={path.messenger} className='flex items-center justify-start w-full'>
            <FaRegMessage className='mr-4 min-w-max' />
            <span className='link-name'> Trò Chuyện</span>
          </Link>
        </li>
        <li className='list-item'>
          <Link to='#/' className='flex items-center justify-start w-full'>
            <RiMentalHealthLine className='mr-4 min-w-max' />
            <span className='link-name'>Bài tập hỗ trợ</span>
          </Link>
        </li>
        <li className='list-item'>
          <Link to='#/' className='flex items-center justify-start w-full'>
            <FaRegNoteSticky className='mr-4 min-w-max' />
            <span className='link-name'> Bài kiểm tra</span>
          </Link>
        </li>
        <li className='list-item'>
          <Link to='#/' className='flex items-center justify-start w-full'>
            <GiHealing className='mr-4 min-w-max' />
            <span className='link-name'>Đánh giá tâm lí</span>
          </Link>
        </li>
        <li className='list-item'>
          <Link to='#/' className='flex items-center justify-start w-full'>
            <FaRegCalendarAlt className='mr-4 min-w-max' />
            <span className='link-name'>Đặt lịch hẹn</span>
          </Link>
        </li>
        <li className='cursor-pointer list-item ' onClick={toggleSidebar}>
          <i>
            <HiOutlineBars3 className='text-4xl text-white' />
          </i>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
