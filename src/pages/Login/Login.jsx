import { useNavigate } from 'react-router-dom';
import path from '../../constants/path';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      console.log('User logged in successfully');
      navigate(path.dashboard);  // Điều hướng đến trang dashboard sau khi đăng nhập thành công
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className='relative bg-center bg-no-repeat bg-cover p-14'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)'
      }}
    >
      <div className='absolute inset-0 z-0 bg-green-600/50' />
      <div className='justify-center min-h-screen mx-0 sm:flex sm:flex-row'>
        <div className='z-10 flex flex-col self-center p-10 sm:max-w-5xl xl:max-w-2xl'>
          <div className='flex-col self-start hidden text-white lg:flex'>
            <p>ESP Logo</p>
            <h1 className='mb-3 text-5xl font-bold'>Chào mừng trở lại !</h1>
          </div>
        </div>
        <div className='z-10 flex self-center justify-center'>
          <div className='p-12 mx-auto bg-white rounded-2xl w-100'>
            <div className='mb-4'>
              <h3 className='text-2xl font-semibold text-gray-800'>Đăng nhập</h3>
              <p className='text-gray-500'>Nhập tài khoản của bạn.</p>
            </div>
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='space-y-2'>
                <label className='text-sm font-medium tracking-wide text-gray-700'>Email</label>
                <input
                  className='w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='email'
                  placeholder='mail@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <label className='mb-5 text-sm font-medium tracking-wide text-gray-700'>Password</label>
                <input
                  className='content-center w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='password'
                  placeholder='Enter your password'
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />

              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember_me'
                    name='remember_me'
                    type='checkbox'
                    className='w-4 h-4 bg-blue-500 border-gray-300 rounded focus:ring-blue-400'
                  />
                  <div className='dis'>
                    <label htmlFor='remember_me' className='block ml-2 text-sm text-gray-800'>
                      Nhớ mật khẩu
                    </label>
                  </div>
                </div>
                <div className='text-sm'>
                  <a href={path.register} className='text-green-400 hover:text-green-500'>
                    Chưa có tài khoản?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='flex justify-center w-full p-3 font-semibold tracking-wide text-gray-100 transition duration-500 ease-in bg-green-400 rounded-full shadow-lg cursor-pointer hover:bg-green-500'
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
