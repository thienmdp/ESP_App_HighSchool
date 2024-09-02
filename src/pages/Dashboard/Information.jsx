import React from 'react'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
const Information = () => {
    return (
        <div className='flex justify-center bg-green-200'>
            <div className=" p-10 flex  w-5/6  font-bold bg-green-400 my-4 rounded-lg" >
                <div>
                    <img class="rounded-full h-24 w-24" src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </div>
                <div class="flex-1 px-10">
                    <h1 class=" text-2xl flex">Thông tin bác sĩ</h1>
                    <h2 class="">Bs.Ngân hà</h2>
                    <h2 class="">SDT:21354812357</h2>
                    <h2 class="">Địa chỉ: 32 nguyễn đình chiểu, hà nội</h2>

                    <div className='pt-10   '>
                        <Link to={path.messenger} type="button" class="btn btn-primary btn-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4">Trò chuyện</Link>
                    </div>
                    <div className=''>
                        <div className='pt-10'>
                            <h1 className='text-4xl'>-Chứng chỉ:</h1>
                            <p className=" font-3xl font-normal text-base word-wrap break-words w-full text-justify mb-4">Hoàn thành chương trình đào tạo Bồi dưỡng sau đại học chuyên khoa Tâm lý Trị liệu Hệ thống và liệu pháp Gia đình, Đại học Y Khoa Phạm Ngọc Thạch liên kết Đại học Công Giáo Louvain, Vương quốc Bỉ khóa (2017 - 2020)</p>
                        </div>
                        <div className=''>
                            <h1 className='text-4xl'>-Chuyên môn:</h1>
                            <p className=" font-3xl font-normal text-base word-wrap break-words w-full text-justify mb-4">Hoàn thành chương trình đào tạo Bồi dưỡng sau đại học chuyên khoa Tâm lý Trị liệu Hệ thống và liệu pháp Gia đình, Đại học Y Khoa Phạm Ngọc Thạch liên kết Đại học Công Giáo Louvain, Vương quốc Bỉ khóa (2017 - 2020)</p>
                        </div>
                        <div className=''>
                            <h1 className='text-4xl'>-Học vấn:</h1>
                            <p className=" font-3xl  font-normal text-base word-wrap break-words w-full text-justify mb-4">Tốt nghiệp Thạc sĩ Tâm lý, Viện Hàn lâm Khoa học xã hội khoá (2011 - 2013) Cử nhân Tâm lý học, Trường Đại Học Văn Hiến khoá (2005 - 2009)</p>
                        </div><div className=''>
                            <h1 className='text-4xl'>-làm việc:</h1>
                            <p className=" font-3xl font-normal text-base word-wrap break-words w-full text-justify mb-4">Công tác tại Khoa Cận lâm sàng Trung Tâm pháp y Tâm thần khu vực TP.HCM (2011 - nay) Công tác tại Khoa Cận lâm sàng Trung Tâm pháp y Tâm thần khu vực TP.HCM tâm lý, Công ty TNHH Touching Soul (06/2018 - 07/2019)</p>
                        </div>
                    </div>
                    <div className="mt-12">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information
