import { useState, useEffect } from 'react' // Import useState for toggle functionality
import '../Sidebar/Sidebar.css'
import { FaRegMessage } from 'react-icons/fa6'
import { RiMentalHealthLine } from 'react-icons/ri'
import { FaHome, FaRegCalendarAlt } from 'react-icons/fa'
import { FaRegNoteSticky } from 'react-icons/fa6'
import { GiHealing } from 'react-icons/gi'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import path from '../../../constants/path'
import { MdDashboard } from 'react-icons/md'
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { IoIosSettings } from "react-icons/io";
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import Logo from '../../../../public/assets/picture/Logo-LnA.png'
const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userQuery = query(collection(db, 'User'), where('Id', '==', userId));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
          setUserStatus('User');
          return;
        }

        const doctorQuery = query(collection(db, 'Doctor'), where('Id', '==', userId));
        const doctorQuerySnapshot = await getDocs(doctorQuery);

        if (!doctorQuerySnapshot.empty) {
          setUserStatus('Doctor');
        } else {
          setUserStatus(null);
        }
        console.log(userStatus)
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [userId]);
  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('log out')
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <div className={`Sidebar bg-green-500 min-h-screen h-auto ${isActive ? 'active' : ''}`}>
      <div className='Logo-menu  flex flex-col'>
        <img className='Logo w-56 h-auto my-4 ' src={Logo} alt="" />
        <div className='flex justify-center my-2'>
        </div>
      </div>

      <ul className='list'>
        <li className='list-item'>
          <Link to={path.heathoveral} className='flex items-center justify-start w-full'>
            <FaRegNoteSticky className='mr-4 min-w-max' />
            <span className='link-name text-lg'>Tổng quan sức khoẻ</span>
          </Link>
        </li>
      {userStatus === 'Doctor' && (<li className='list-item'>
          <Link to={path.dashboard} className='flex items-center justify-start w-full'>
            <MdDashboard className='mr-4 min-w-max' />
            <span className='link-name'>Sức khoẻ</span>
          </Link>
        </li>)}
        
        {/* <li className='list-item'>
          <Link to={path.messenger} className='flex items-center justify-start w-full'>
            <FaRegMessage className='mr-4 min-w-max' />
            <span className='link-name'> Trò Chuyện</span>
          </Link>
        </li> */}
        {userStatus === 'User' && ( <li className='list-item'>
          <Link to={path.examsTest} className='flex items-center justify-start w-full'>
            <RiMentalHealthLine className='mr-4 min-w-max' />
            <span className='link-name'>Đánh giá tâm lí</span>
          </Link>
        </li>)}
        {userStatus === 'User' && ( <li className='list-item'>
          <Link to={path.booking} className='flex items-center justify-start w-full'>
            <FaRegCalendarAlt className='mr-4 min-w-max' />
            <span className='link-name'>Đặt lịch hẹn</span>
          </Link>
        </li>)}
        <li className='list-item'>
          <Link to={path.meeting} className='flex items-center justify-start w-full'>
            <FaRegCalendarAlt className='mr-4 min-w-max' />
            <span className='link-name'>Các lịch hẹn</span>
          </Link>
        </li>
        <li className='list-item'>
          <Link to={path.historyapoinment} className='flex items-center justify-start w-full'>
            <FaRegCalendarAlt className='mr-4 min-w-max' />
            <span className='link-name'>Lịch sử lịch hẹn</span>
          </Link>
        </li>
        <li className='list-item'>
          <Link to={path.profile} className='flex items-center justify-start w-full'>
            <IoIosSettings className='mr-4 min-w-max' />
            <span className='link-name'>Cài đặt</span>
          </Link>
        </li>
        <li className='cursor-pointer list-item ' onClick={toggleSidebar}>
          <i>
            <HiOutlineBars3 className='text-4xl text-white' />
          </i>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;