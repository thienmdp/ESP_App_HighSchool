import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import path from '../../../constants/path';


export default function Apoinment() {
  const location = useLocation();
  const { appointments } = location.state || {};  // Destructure appointment from location.state

  return (
    <div className='w-full h-full mx-auto'>
      <header className=' text-white font-bold text-xl header top-0 left-0 w-full h-20 bg-green-400 flex justify-between items-center px-10 z-10'>
        <h1 className='text-3xl	font-bold	'>Lịch hẹn của bạn</h1>

        <div className='space-x-8 text-lg'>
          <Link >Các lịch hẹn</Link>
          <Link to={path.booking}>Đặt Lịch hẹn</Link>
          <Link>Lịch sử Hẹn </Link>
        </div>
      </header>





      <div class="p-20 flex text-black py-10 justify-center bg-green-200  ">
        <img class="rounded-full h-24 w-24" src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <div class="mt-2 px-4 justify-center ">
          <h1 class=" text-4xl font-bold ">Bs.{appointments?.doctorname}</h1>
          <p class=" font-medium w-full text-justify mb-4"></p>
          <h1 className='font-medium'>Đặt lịch khám : .{appointments?.hour}-{appointments?.selectDay}</h1>


          <div className="flex justify-center px-4 py-2   mt-10 text-xl border-black rounded-lg border-solid p-0">
            <h1 className='text-green-600 font-bold text-4xl text-center'>Thông tin bệnh nhân</h1>

          </div>

          <div className='mt-10  flex-row '>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>Họ và tên: {appointments.name}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>SDT:{appointments.phoneNumber}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>Năm sinh:{appointments.year}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>địa chỉ email:{appointments.email}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>Họ và tên người giám hộ: {appointments.name1}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>SDT người giám hộ: {appointments.phoneNumber1}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>địa chỉ: {appointments.address},{appointments?.city}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>Lý do khám: {appointments.note}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>Trạng thái : {appointments.status === 0 ? 'chưa gặp mặt' : 'đã gặp mặt'}</p>
            <p className='w-full  mt-4 border p-4 bg-white border border-black'>Đánh giá của bác sĩ: {appointments.result}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
