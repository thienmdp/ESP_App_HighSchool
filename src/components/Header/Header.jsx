import { Link } from 'react-router-dom'
import path from '../../constants/path'

export default function Header() {
  return (
    <nav className='bg-white border-gray-200 '>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href={path.landing} className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src='../../../public/assets/picture/logo.png' className='h-12' alt='Flowbite Logo' />
        </a>
        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
          <Link to={path.register} className='block mr-4 px-3 md:p-0  rounded text-teal-700 '>
            Đăng ký
          </Link>
          <Link
            to={path.login}
            type='button'
            className='text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 text-center   '
          >
            Đăng nhập
          </Link>
        </div>
        <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-cta'>
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  '>
            <li>
              <a
                href={path.landing}
                className='block py-2 px-3 md:p-0 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 '
                aria-current='page'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href={path.landing}
                className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700    '
              >
                About
              </a>
            </li>
            <li>
              <a
                href={path.landing}
                className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700    '
              >
                Services
              </a>
            </li>
            <li>
              <a
                href={path.landing}
                className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700    '
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
