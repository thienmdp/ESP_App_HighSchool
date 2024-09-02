import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import path from '../../constants/path';
import { TbExchange } from "react-icons/tb";

const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log('log out')
    } catch (error) {
        console.log('Error logging out:', error);
    }
};
function Profile() {
    return (
        <div className='w-full h-full mx-auto grid-row '>

            <header className=' text-white font-bold text-xl w-full h-20 bg-green-400 flex justify-between items-center px-10 z-10'>
                <h1 className='text-3xl	font-bold flex justify-center	'>Cài đặt</h1>
            </header>


            <div class="grid grid-cols-3 px-40 pt-20 border rounded  ">
                <div class="bg-green-300  flex flex-col items-center p-5 ">
                    <img class="rounded-full w-48 h-48 mb-4  object-cover  " src="https://images.pexels.com/photos/5758468/pexels-photo-5758468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <p className='text-2xl font-bold'>Nghĩa ngu</p>
                    <div className=" ">
                        <h1 className='flex justify-center font-bold text-lg pt-10 pb-1'>
                            Thông tin cá nhân của bạn/bác sĩ:
                        </h1>
                        <p className=" font-normal text-base word-wrap break-words w-full text-justify mb-4">-Hoàn thành chương trình đào tạo Bồi dưỡng sau đại học chuyên khoa Tâm lý Trị liệu Hệ thống và liệu pháp Gia đình, Đại học Y Khoa Phạm Ngọc Thạch liên kết Đại học Công Giáo Louvain, Vương quốc Bỉ khóa (2017 - 2020)</p>
                        <p className=" font-normal text-base word-wrap break-words w-full text-justify mb-4">-Hoàn thành chương trình đào tạo Bồi dưỡng sau đại học chuyên khoa Tâm lý Trị liệu Hệ thống và liệu pháp Gia đình, Đại học Y Khoa Phạm Ngọc Thạch liên kết Đại học Công Giáo Louvain, Vương quốc Bỉ khóa (2017 - 2020)

                        </p>

                    </div>
                    <div className='font-bold text-xl bg-green-500 hover:bg-green-600 rounded p-2' onClick={handleLogout}>
                        Đăng xuất
                    </div>
                </div>


                <div class="bg-green-200 col-span-2 ">
                    <h1 className=' font-bold text-3xl justify-center flex p-10 text-whtie  '>Tài khoảng</h1>
                    <div className='flex flex-col items-center p-6 '>
                        <div className='py-4'>
                            <h1 className='text-2xl font-bold'>Tên người dùng:</h1>
                            <p className='w-96 mt-4 p-2 bg-green-100 font-bold text-lg flex  '>
                                Lê Trung Hiếu Nghĩa
                                <TbExchange className='mr-2 flex justify-end ' />
                            </p>

                        </div>
                        <div className='py-4 '>
                            <h1 className='text-2xl font-bold'>Email của bạn:</h1>
                            <p className='w-96 mt-4 p-4 bg-green-100 font-bold text-lg'>Nghialee987654321@gmail.com</p>
                        </div>
                        <div className='py-4'>
                            <h1 className='text-2xl font-bold'>Số điện thoại :</h1>
                            <p className='w-96 mt-4 p-4 bg-green-100 font-bold text-lg'>0372524027</p>
                        </div>
                        <div className='py-4'>
                            <h1 className='text-2xl font-bold'>Mật khẩu</h1>
                            <p typeof='' className='w-96 mt-4 p-4 bg-green-100 font-bold text-lg'>0372524027</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile
