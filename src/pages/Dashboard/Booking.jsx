import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import path from "../../constants/path";
import TitleBooking from "./components/TitleBooking";

export default function Booking() {
  const [data, setData] = useState([]);
  const [nameDoctor, setNameDoctor] = useState("");
  const [addressDoctor, setAddressDoctor] = useState("")
  const [phoneumberDoctor, setPhonenumberDoctor] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // Biến lưu ID của bác sĩ được chọn
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorRef = collection(db, 'Doctor');
        const q = query(doctorRef, limit(25));
        const querySnapshot = await getDocs(q);

        const doctors = [];
        querySnapshot.forEach(doc => {
          const doctorData = doc.data();
          doctors.push({
            id: doc.id,
            ...doctorData,
          });
        });
        setData(doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleSelectTime = (time, doctorId, name, address, phone) => {
    setSelectedTime(time);
    setSelectedDoctorId(doctorId); // Cập nhật ID của bác sĩ khi chọn thời gian
    setNameDoctor(name);
    setAddressDoctor(address);
    setPhonenumberDoctor(phone)
  };

  const handleProceed = () => {
    // Save the selected date, time, and doctorId, then navigate to the next page
    if (selectedDoctorId) {
      navigate(path.makeapoinment, { state: { selectedDate, selectedTime, doctorId: selectedDoctorId, doctorname: nameDoctor, doctoraddress: addressDoctor, doctorphonenumber: phoneumberDoctor } });
    } else {
      alert("Vui lòng chọn thời gian và bác sĩ.");
    }
  };

  return (
    <div className="w-full h-full bg-slate-200">
      <TitleBooking className="text-white rounded" />
      <div className="text-xl flex-col p-10">
        <h1 className="font-bold text-xl">Danh sách các bác sĩ gợi ý:</h1>
        {data.map((doctor, index) => (
          <div className="p-10 flex font-bold bg-green-300 my-4 rounded-lg" key={index}>
            <div>
              <img className="rounded-full h-24 w-24" src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <Link to={path.info} className="text-green flex py-5 hover:text-white hover:underline">Xem thêm</Link>
            </div>
            <div className="flex-1 px-10">
              <h1 className="text-2xl">Bs.{doctor.user}</h1>
              <h2 className="text-x">SDT: {doctor.phonenumber}</h2>
              <p className="font-medium text-base word-wrap break-words w-full text-justify mb-4">Bác sĩ có 25 năm kinh nghiệm về bệnh lý liên quan cột sống. Hiện là Trưởng khoa Phẫu thuật Cột sống, Bệnh viện Việt Đức. Bác sĩ nhận khám từ 7 tuổi trở lên.</p>

              <div className="mt-16">

                <div className="flex flex-row items-start">

                  <div> chọn ngày:
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleSelectDate}
                      minDate={new Date()}
                      maxDate={new Date().setDate(new Date().getDate() + 7)}
                      className="p-2 ml-6 rounded mb-8"
                    />
                  </div>

                </div>
                <div className="flex gap-x-10 mt-10 mb-10">Chọn giờ:
                  {["7h-8h", "8h-9h", "10h-11h", "13h-14h", "15h-16h", "17h-18h", "19h-20h"].map((time, timeIndex) => (
                    <button
                      key={timeIndex}
                      className={`border-2 rounded p-1 ${selectedTime === time && selectedDoctorId === doctor.id ? 'bg-green-400' : 'hover:bg-green-400'}`}
                      onClick={() => handleSelectTime(time, doctor.id, doctor.user, doctor.address, doctor.phonenumber)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button type="button" className="btn btn-primary btn-lg bg-green-500 p-2 rounded mb-8 hover:bg-green-600 mr-10" onClick={handleProceed}>đặt lịch hẹn</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
