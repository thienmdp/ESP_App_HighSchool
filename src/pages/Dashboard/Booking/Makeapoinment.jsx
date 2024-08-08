import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import TitleBooking from '../components/TitleBooking';
import path from '../../../constants/path';


export default function Makeapoinment() {
    const [gender, setGender] = useState('male'); // Default gender is male

    const handleGenderChange = (newGender) => {
        setGender(newGender);
    };
    return (
        <div className='w-full h-full mx-auto'>
            <TitleBooking />
            <div class="p-20 flex text-black py-10 justify-center bg-green-200  ">
                <img class="rounded-full h-24 w-24" src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <div class="mt-2 px-4 justify-center ">
                    <h1 class=" text-2xl font-bold">Phó Giáo sư, Tiến sĩ Đinh Ngọc Sơn</h1>
                    <p class=" font-medium text-base word-wrap break-words w-full text-justify mb-4"></p>
                    <h1 className='font-medium'>Đặt lịch khám : 7h-10h-thứ bảy-14-9-2024</h1>
                    <div className='mt-20  flex-row '>
                        <input type="text" placeholder='Họ và tên bệnh nhân (bắt buộc) vd:Nguyễn văn A' className='w-full w-full mt-4 border p-4 placeholder-lg		' />
                        <div className='flex gap-2 p-2 '>
                            <input
                                className='border-black p-4 '
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
                    <div className='mt-2 '>
                        <input type="text" placeholder='Họ và tên' className='w-full mt-4 border p-4 placeholder-lg border-black rounded-lg	' />
                        <input type="email" placeholder='Địa chỉ email' className='w-full	mt-4 border p-4 placeholder-lg border-black rounded-lg' />
                        <input type="text" placeholder='Năm sinh' className='w-full mt-4 border p-4 placeholder-lg border-black rounded-lg	' />
                        <input type="text" placeholder='Tên người giám hộ của bệnh nhân(bắt buộc)' className='w-full mt-4 border p-4 placeholder-lg border-black rounded-lg	' />
                        <input type="text" placeholder='Số điện thoại của người giám hộ(bắt buộc) ' className='w-full	mt-4 border p-4 placeholder-lg border-black rounded-lg' />
                        <input type="text" placeholder='Nhập tỉnh/thành' className='w-full	mt-4 border p-4 placeholder-lg border-black rounded-lg' />
                        <input type="text" placeholder='Quận/Huyên' className='w-full	mt-4 border p-4 placeholder-lg border-black rounded-lg' />
                        <input type="text" placeholder='Địa chỉ' className='w-full mt-4 border p-4 placeholder-lg border-black rounded-lg	' />
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
                                <p className="mt-2">-Ghi rõ họ và tên, viết hoa </p>
                                <p className="mt-2">-Điền đầy đủ thông tin, kiểm tra lại thông tin trước khi xác nhận</p>
                            </div>
                        </div>

                        <div className="flex  px-4 py-2">

                        </div>
                        <div className="flex px-4 py-2">

                        </div>
                    </div>

                    <div class="flex justify-center items-center mt-10 ">
                        <Link to={path.historyapoinment} class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Xác Nhận đặt lịch</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
