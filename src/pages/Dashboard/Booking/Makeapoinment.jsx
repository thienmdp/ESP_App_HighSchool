import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../../firebaseConfig'; // Import Firestore config
import { collection, addDoc } from 'firebase/firestore';
import TitleBooking from '../components/TitleBooking';
import path from '../../../constants/path';
import { auth } from '../../../firebaseConfig';

export default function Makeapoinment() {
    const userId = auth.currentUser?.uid
    const [gender, setGender] = useState('male'); // Default gender is male
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        year: '',
        name1: '',
        phoneNumber1: '',
        city: '',
        district: '',
        address: '',
        note: ''
    });
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedDate, selectedTime, doctorId, doctorname, doctoraddress, doctorphonenumber } = location.state || {};

    const handleGenderChange = (newGender) => {
        setGender(newGender);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Tính ngày trong tuần từ selectedDate
    const calculateDayOfWeek = (date) => {
        const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    const handleSubmit = async () => {
        const validationErrors = getErrors(
            formData.name,
            formData.phoneNumber,
            formData.email,
            formData.year,
            formData.name1,
            formData.phoneNumber1,
            formData.city,
            formData.district,
            formData.address
        );

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            try {
                // Add the appointment to Firestore
                const appointmentRef = collection(db, 'Appoinment');
                await addDoc(appointmentRef, {
                    ...formData,
                    doctorId,
                    doctoraddress,
                    doctorname,
                    doctorphonenumber, // Bạn có thể nhận giá trị này từ nơi khác
                    gender,
                    hour: selectedTime,
                    note: formData.note,
                    rated: false,
                    result: "",
                    selectedDate: selectedDate ? selectedDate.toLocaleDateString() : '',
                    selectedDay: selectedDate ? calculateDayOfWeek(selectedDate) : '',
                    status: 0,
                    userId,
                    createdAt: new Date(),
                });
                console.log('success')
                // Navigate to history page after successful submission
                navigate(path.historyapoinment);
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }
    };

    return (
        <div className='w-full h-full mx-auto'>
            <TitleBooking />
            <div className="p-20 flex text-black py-10 justify-center bg-green-200">
                <img className="rounded-full h-24 w-24" src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <div className="mt-2 px-4 justify-center ">
                    <h1 className="text-2xl font-bold">Bs.{doctorname}</h1>
                    <p className="font-medium text-base word-wrap break-words w-full text-justify mb-4"></p>
                    <h1 className='font-medium'>Đặt lịch khám: {selectedTime} - {selectedDate ? selectedDate.toLocaleDateString() : 'Chưa chọn ngày'}</h1>
                    <div className='mt-20 flex-row'>
                        <input
                            type="text"
                            name="name"
                            placeholder='Họ và tên bệnh nhân (bắt buộc) vd: Nguyễn Văn A'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                        <div className='flex gap-2 p-2'>
                            <input
                                className='border-black p-4'
                                type="radio"
                                value="male"
                                checked={gender === 'male'}
                                onChange={() => handleGenderChange('male')} />
                            <p>Nam</p>
                            <input
                                type="radio"
                                value="female"
                                checked={gender === 'female'}
                                onChange={() => handleGenderChange('female')} />
                            <p>Nữ</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder='Số điện thoại bệnh nhân'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                        <input
                            type="email"
                            name="email"
                            placeholder='Địa chỉ email'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        <input
                            type="text"
                            name="year"
                            placeholder='Năm sinh'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.year}
                            onChange={handleChange}
                        />
                        {errors.year && <p className="text-red-500">{errors.year}</p>}
                        <input
                            type="text"
                            name="name1"
                            placeholder='Tên người giám hộ'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.name1}
                            onChange={handleChange}
                        />
                        {errors.name1 && <p className="text-red-500">{errors.name1}</p>}
                        <input
                            type="text"
                            name="phoneNumber1"
                            placeholder='Số điện thoại người giám hộ'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.phoneNumber1}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber1 && <p className="text-red-500">{errors.phoneNumber1}</p>}
                        <input
                            type="text"
                            name="city"
                            placeholder='Nhập tỉnh/thành'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <p className="text-red-500">{errors.city}</p>}
                        <input
                            type="text"
                            name="district"
                            placeholder='Quận/Huyện'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.district}
                            onChange={handleChange}
                        />
                        {errors.district && <p className="text-red-500">{errors.district}</p>}
                        <input
                            type="text"
                            name="address"
                            placeholder='Địa chỉ'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <p className="text-red-500">{errors.address}</p>}
                        <input
                            type="text"
                            name="note"
                            placeholder='ghi chú'
                            className='w-full mt-4 border p-4 placeholder-lg'
                            value={formData.note}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col justify-center mt-10 text-xl border border-black rounded-lg border-solid p-0">
                        <div className="flex justify-between px-4 py-2">
                            <p>Giá khám:</p>
                            <p>300.000đ</p>
                        </div>
                        <div className="flex justify-between px-4 py-2">
                            <p>Phí đặt lịch:</p>
                            <p>miễn phí</p>
                        </div>
                        <div className="flex justify-between px-4 py-2">
                            <p>Tổng cộng:</p>
                            <p className='text-red-700'>300.000đ</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center mt-10 text-xl border border-black rounded-lg border-solid p-0">
                        <div className="flex justify-center px-4 py-2 flex-col">
                            <h1 className='text-red-700 font-bold text-2xl text-center'>Lưu ý</h1>
                            <div className="text-center">
                                <p>-Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh vui lòng:</p>
                                <p className="mt-2">-Ghi rõ họ và tên, viết hoa</p>
                                <p className="mt-2">-Điền đầy đủ thông tin, kiểm tra lại thông tin trước khi xác nhận</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-10 ">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Xác Nhận đặt lịch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Hàm kiểm tra lỗi nhập liệu
const getErrors = (
    name,
    phoneNumber,
    email,
    year,
    name1,
    phoneNumber1,
    city,
    district,
    address
) => {
    const errors = {};

    if (!name || name.trim() === '') {
        errors.name = 'Vui lòng nhập họ tên bệnh nhân.';
    }

    if (!phoneNumber || phoneNumber.trim() === '' || !/^\d+$/.test(phoneNumber)) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại hợp lệ.';
    }

    if (!email || email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Vui lòng nhập địa chỉ email hợp lệ.';
    }

    if (!year || year.trim() === '' || !/^\d+$/.test(year)) {
        errors.year = 'Vui lòng nhập năm sinh hợp lệ.';
    }

    if (!name1 || name1.trim() === '') {
        errors.name1 = 'Vui lòng nhập họ tên người bảo hộ.';
    }

    if (!phoneNumber1 || phoneNumber1.trim() === '' || !/^\d+$/.test(phoneNumber1)) {
        errors.phoneNumber1 = 'Vui lòng nhập số điện thoại người bảo hộ hợp lệ.';
    }

    if (!city || city.trim() === '') {
        errors.city = 'Vui lòng nhập tỉnh/thành.';
    }

    if (!district || district.trim() === '') {
        errors.district = 'Vui lòng nhập quận/huyện.';
    }

    if (!address || address.trim() === '') {
        errors.address = 'Vui lòng nhập địa chỉ.';
    }

    return errors;
};
