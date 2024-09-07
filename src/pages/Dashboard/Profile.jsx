import React, { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, getDoc, doc, getDocs } from 'firebase/firestore';
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
    const [userData, setUserData] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser.uid;
            try {
                const userQuery = query(collection(db, 'User'), where('Id', '==', userId));
                const userQuerySnapshot = await getDocs(userQuery);

                if (!userQuerySnapshot.empty) {
                    setUserStatus('User');
                    setUserData(userQuerySnapshot.docs[0].data());
                    return;
                }

                const doctorQuery = query(collection(db, 'Doctor'), where('Id', '==', userId));
                const doctorQuerySnapshot = await getDocs(doctorQuery);

                if (!doctorQuerySnapshot.empty) {
                    setUserStatus('Doctor');
                    setUserData(doctorQuerySnapshot.docs[0].data());
                    await fetchDoctorProfile(userId);
                } else {
                    setUserStatus(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const fetchDoctorProfile = async (doctorId) => {
        try {
            const profileDocRef = doc(db, 'ProfileD', doctorId);
            const profileDocSnapshot = await getDoc(profileDocRef);

            if (profileDocSnapshot.exists()) {
                setDoctorProfile(profileDocSnapshot.data());
            }
        } catch (error) {
            console.error('Error fetching doctor profile:', error);
        }
    };

    return (
        <div className='w-full h-full mx-auto grid-row '>

            <header className=' text-white font-bold text-xl w-full h-20 bg-green-400 flex justify-between items-center px-10 z-10'>
                <h1 className='text-3xl	font-bold flex justify-center	'>Cài đặt</h1>
            </header>


            <div class="grid grid-cols-3 px-40 pt-20 border rounded  ">
                <div class="bg-green-300  flex flex-col items-center p-5 ">
                    <img class="rounded-full w-48 h-48 mb-4  object-cover  " src={userData?.avatar || "https://cdn-icons-png.flaticon.com/128/12311/12311772.png"} alt="" />
                    <p className='text-2xl font-bold'>{userData?.user || 'Loading...'}</p>
                    {userStatus === 'Doctor' && doctorProfile && (
                        <div className=" ">
                            <h1 className='flex justify-center font-bold text-lg pt-10 pb-1'>
                                Thông tin cá nhân của bác sĩ:
                            </h1>
                            <p className="font-normal text-base word-wrap break-words w-full text-justify mb-4">
                                <strong>Chứng chỉ:</strong> {doctorProfile.chungchi}
                            </p>
                            <p className="font-normal text-base word-wrap break-words w-full text-justify mb-4">
                                <strong>Chuyên môn:</strong> {doctorProfile.chuyenmon}
                            </p>
                            <p className="font-normal text-base word-wrap break-words w-full text-justify mb-4">
                                <strong>Học vấn:</strong> {doctorProfile.hocvan}
                            </p>
                            <p className="font-normal text-base word-wrap break-words w-full text-justify mb-4">
                                <strong>Làm việc:</strong> {doctorProfile.lamviec}
                            </p>
                        </div>
                    )}
                    {userStatus === 'User' && (
                        <div className="pt-10">
                            <p className="font-normal text-xl mb-2">
                                <strong>SDT:</strong> {userData?.phonenumber}
                            </p>
                            <p className="font-normal text-xl mb-2">
                                <strong>Email:</strong> {userData?.email}
                            </p>
                        </div>
                    )}
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
                                {userData?.user || 'Loading...'}
                                <TbExchange className='mr-2 flex justify-end ' />
                            </p>

                        </div>
                        <div className='py-4 '>
                            <h1 className='text-2xl font-bold'>Email của bạn:</h1>
                            <p className='w-96 mt-4 p-4 bg-green-100 font-bold text-lg'>{userData?.email || 'Loading...'}</p>
                        </div>
                        <div className='py-4'>
                            <h1 className='text-2xl font-bold'>Số điện thoại :</h1>
                            <p className='w-96 mt-4 p-4 bg-green-100 font-bold text-lg'>{userData?.phonenumber || 'Loading...'}</p>
                        </div>
                        <div className='py-4'>
                            <h1 className='text-2xl font-bold'>Mật khẩu</h1>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='w-96 mt-4 p-4 bg-green-100 font-bold text-lg'
                                    value={userData?.password || 'Loading...'}
                                    readOnly
                                />
                                <button
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-xl'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile
