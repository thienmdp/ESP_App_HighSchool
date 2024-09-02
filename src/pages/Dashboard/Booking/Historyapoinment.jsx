import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { db, auth } from '../../../firebaseConfig';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import path from '../../../constants/path';

export default function HistoryMeetings() {
  const userId = auth.currentUser?.uid;
  const [userStatus, setUserStatus] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
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
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [userId]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userStatus) return;

      try {
        const appointmentQuery = query(
          collection(db, 'Appoinment'),
          where(userStatus === 'User' ? 'userId' : 'doctorId', '==', userId),
          where('status', '==', 1),
          limit(20)
        );

        const querySnapshot = await getDocs(appointmentQuery);
        const appointmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
        console.log(appointmentsData)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [userStatus, userId]);

  return (
    <div className="w-full h-full">
      {/* Header */}
      <header className="bg-green-400 text-white font-bold text-xl w-full h-20 flex justify-center items-center px-10">
        <h1 className="text-3xl">Lịch sử hẹn</h1>
      </header>

      {/* Appointment List */}
      <div className="flex flex-col items-center w-full p-4">
        {appointments.length === 0 ? (
          <p>Không có lịch hẹn nào</p>
        ) : (
          appointments.map((appointment, index) => (
            <div
              key={index}
              onClick={() => navigate(path.apoinment, {
                state: { appointments: appointment },
              })}
              className="flex flex-col bg-green-200 p-4 m-4 rounded-lg border border-gray-300 w-full max-w-md cursor-pointer"
            >
              <h2 className="font-bold text-xl flex items-center gap-2">
                {userStatus === 'User' ? `Bs.${appointment.doctorname}` : `Kh.${appointment.name}`}
              </h2>
              <p>SĐT: {userStatus === 'User' ? appointment.doctorphonenumber : appointment.phoneNumber}</p>
              <p>Địa chỉ: {appointment.address}, {appointment.city}</p>
              <p>Thời gian: {appointment.hour} - {appointment.selectedDay} - {appointment.selectedDate}</p>
              <p>Trạng thái: <span className="text-green-600">Đã gặp mặt</span></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
