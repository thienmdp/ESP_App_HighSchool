import { useState } from 'react'
import path from '../../constants/path'
import { Link } from 'react-router-dom'
import firebase from '../../firebaseConfig'
import 'firebase/compat/auth'
import 'firebase/compat/database'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [pass, setPass] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, pass)
      if (user) {
        alert('Đăng kí thành công')
      }
    } catch (error) {
      alert(error)
    }
  }


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
            <h1 className='mb-3 text-5xl font-bold'>Đăng kí</h1>
            <p className='pr-3'>
              - Hệ thống sơ cứu và chữa lành cho học sinh mắc chướng ngại tâm lý-
            </p>
          </div>
        </div>
        <div className='z-10 flex self-center justify-center'>
          <div className='p-12 mx-auto bg-white rounded-2xl w-100 '>
            <div className='mb-4'>
              <h3 className='text-2xl font-semibold text-gray-800'>Đăng kí</h3>
              <p className='text-gray-500'>Đăng kí tài khoảng</p>
            </div>
            <div className='space-y-5'>
              <div className='space-y-2'>
                <label className='mb-5 text-sm font-medium tracking-wide text-gray-700'>Tên người dùng</label>
                <input
                  className='content-center w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='text'
                  placeholder='Nhập tên'
                  value={name}
                  onChange={(e) => setName(e.target.value)}

                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium tracking-wide text-gray-700'>Email</label>
                <input
                  className='w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='email'
                  placeholder='mail@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                />
              </div>
              <div className='space-y-2'>
                <label className='mb-5 text-sm font-medium tracking-wide text-gray-700'>Số điện thoại</label>
                <input
                  className='content-center w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='number'
                  placeholder='Số điện thoại'
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}

                />
              </div>
              <div className='space-y-2'>
                <label className='mb-5 text-sm font-medium tracking-wide text-gray-700'>Mật khẩu</label>
                <input
                  className='content-center w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='text'
                  placeholder='Nhập lại mật khẩu'
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}

                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <a href={path.login} className='text-green-400 hover:text-green-500'>
                    Đã có tài khoản ?
                  </a>
                </div>
              </div>
              <div>
                <button
                  onClick={submit}
                  type='submit'
                  className='flex justify-center w-full p-3 font-semibold tracking-wide text-gray-100 transition duration-500 ease-in bg-green-400 rounded-full shadow-lg cursor-pointer hover:bg-green-500'
                >
                  Đăng kí
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
