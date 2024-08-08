import React from 'react'
import { Link } from 'react-router-dom'
import { IoDocumentTextOutline } from "react-icons/io5";
import path from '../../../constants/path';

export default function Historyapoinment() {
  return (
    <div className="w-full h-full">
      <header className="text-white font-bold text-xl header top-0 left-0 w-full h-20 bg-green-400 flex justify-center items-center px-10 z-10">
        <h1 className="text-3xl font-bold">Lịch sử hẹn</h1>
      </header>

      <div className="flex w-full ">
        <Link to={path.apoinment} className="flex items-center ml-6 pointer cursor-pointer">
          <div className="mt-10 bg-green-200 p-4 rounded-lg border border-gray-300 gap-4 flex-grow">
            <h1 className="font-bold flex">
              <IoDocumentTextOutline className="text-3xl" />
              Bác Sĩ Trần Thị Hà An
            </h1>
            <p>Sđt:090950193</p>
            <p>địa chỉ: trường chinh, đống đa, hà nội</p>
            <p>thời gian:14:30 chủ nhật</p>
            <p className="flex pr-2">
              trạng thái: <p className="">đã gặp mặt</p>
            </p>
          </div>
        </Link>
      </div>
    </div>

  )
}
