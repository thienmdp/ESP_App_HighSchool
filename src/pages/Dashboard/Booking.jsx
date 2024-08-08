import styled from "styled-components"
import { Link } from "react-router-dom"
import path from "../../constants/path"
import TitleBooking from "./components/TitleBooking"
export default function Booking() {
  return (
    <div className="w-full h-full bg-slate-200	" >
      <TitleBooking className="text-white rounded" />
      <div className=" text-xl flex-col p-10">
        <h1 className="font-bold text-xl ">Danh sách các bác sĩ gợi ý:</h1>
        {Array(7).fill(0).map((_, index) => (
          <div class="p-10 flex  font-bold bg-green-300 my-4 rounded-lg" key={index}>
            <img class="rounded-full h-24 w-24" src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <div class="flex-1 px-10">
              <h1 class=" text-2xl">Phó Giáo sư, Tiến sĩ Đinh Ngọc Sơn {index + 1}</h1>
              <p class=" font-medium text-base word-wrap break-words w-full text-justify mb-4">Bác sĩ có 25 năm kinh nghiệm về bệnh lý liên quan cột sống. Hiện là Trưởng khoa Phẫu thuật Cột sống, Bệnh viện Việt Đức. Bác sĩ nhận khám từ 7 tuổi trở lên.</p>
              <div className="mt-16">
                <Link class="text-2xl font-bold bg-green-500  text-white py-2 px-4 rounded ">Đặt lịch hẹn :</Link>
                <buttons className=" flex gap-x-10 mt-10   ">
                  <Link to={path.makeapoinment} className="border-2 rounded p-1 hover:bg-green-400 "> 7h-8h</Link>
                  <Link to={path.makeapoinment} className="border-2 rounded p-1 hover:bg-green-400 "> 8h-9h</Link>
                  <Link to={path.makeapoinment} className="border-2 rounded p-1 hover:bg-green-400 "> 10h-11h</Link>
                  <Link to={path.makeapoinment} className="border-2 rounded p-1 hover:bg-green-400 "> 13h-14h</Link>
                  <Link to={path.makeapoinment} className="border-2 rounded p-1 hover:bg-green-400 "> 15h-16h</Link>
                  <Link to={path.makeapoinment} className="border-2 rounded p-1 hover:bg-green-400 "> 17h-18h</Link>
                  <Link to={path.makeapoinment} className="border-2 rounded p-1 hover:bg-green-400 "> 19h-20h</Link>
                </buttons>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
