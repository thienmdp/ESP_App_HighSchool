import React from 'react'
import { Link } from 'react-router-dom'
import path from '../../../constants/path'

export default function TitleBooking() {
      return (
            <header className=' text-white font-bold text-xl header top-0 left-0 w-full h-20 bg-green-400 flex justify-between items-center px-10 z-10'>
                  <h1 className='text-3xl	font-bold	'> Đặt lịch hẹn</h1>

                  <div className='space-x-8 text-lg'>
                        <Link >Các lịch hẹn</Link>
                        <Link to={path.booking}>Đặt Lịch hẹn</Link>
                        <Link>Lịch sử Hẹn </Link>
                  </div>
            </header>
      )
}     
