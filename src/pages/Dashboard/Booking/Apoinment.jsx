import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import path from '../../../constants/path';


export default function Apoinment() {
  // Removed the gender state and handleGenderChange function

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
          <h1 class=" text-4xl font-bold ">Phó Giáo sư, Tiến sĩ Đinh Ngọc Sơn</h1>
          <p class=" font-medium w-full text-justify mb-4"></p>
          <h1 className='font-medium'>Đặt lịch khám : 7h-10h-thứ bảy-14-9-2024</h1>


          <div className="flex justify-center px-4 py-2  justify-center mt-10 text-xl border-black rounded-lg border-solid p-0">
            <h1 className='text-green-600 font-bold text-4xl text-center'>Thông tin khách hàng</h1>

          </div>

          <div className='mt-10  flex-row '>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>Họ và tên: Phan Vũ Minh Tuệ</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>SDT:0896475307</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>Năm sinh:2007</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>địa chỉ email:phanvuminhtue@gmail.com</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>Họ và tên người giám hộ: Phan Văn Sơn</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>SDT: người giám hộ</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>địa chỉ: 32 Nguyễn Xuân Ôn, Đằ Nẵng</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>Lý do khám: trầm cảm lo âu</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>Trạng thái : đã gặp mặt</p>
            <p className='w-full w-full mt-4 border p-4 bg-white border border-black'>Đánh giá của bác sĩ: kết quả khám bình thường</p>
          </div>
        </div>
      </div>
    </div>
  )
}
