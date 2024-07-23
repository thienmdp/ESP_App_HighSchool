import { Link } from 'react-router-dom'
import path from '../../constants/path'

export default function Header() {
  return (
    <nav className='bg-white border-gray-200 '>
      <div className='flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto'>
        <a href={path.landing} className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src='../../../public/assets/picture/logo.png' className='h-12' alt='Flowbite Logo' />
        </a>
        <div className='flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse'>
          <Link to={path.register} className='block px-3 mr-4 text-teal-700 rounded md:p-0 '>
            Đăng ký
          </Link>
          <Link
            to={path.login}
            type='button'
            className='px-4 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 '
          >
            Đăng nhập
          </Link>
        </div>
        <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-cta'>
          <ul className='flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white '>
            <li>
              <a
                href={path.landing}
                className='block px-3 py-2 text-white bg-teal-700 rounded md:p-0 md:bg-transparent md:text-teal-700 '
                aria-current='page'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href={path.landing}
                className='block px-3 py-2 text-gray-900 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 '
              >
                About
              </a>
            </li>
            <li>
              <a
                href={path.landing}
                className='block px-3 py-2 text-gray-900 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 '
              >
                Services
              </a>
            </li>
            <li>
              <a
                href={path.landing}
                className='block px-3 py-2 text-gray-900 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 '
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
