import { useState } from 'react'
import path from '../../constants/path'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('');
  const [reenter, setReenter] = useState('');
  const [role, setRole] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    const errors = getErrors(name, phone, email, password, reenter);

    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setErrors(errors);
      console.log(errors);
    } else {
      setErrors({});
      setShowErrors(false);
      await handleSignUp(email, password);
    }
  };

  const getErrors = (name, phone, email, password, reenter) => {
    const errors = {};
    if (!name) {
      errors.name = 'Please Enter User';
    }
    if (!phone) {
      errors.phone = 'Please Enter Phonenumber ';
    } else if (phone.length !== 10) {
      errors.phone = 'Enter phone of 10 numbers';
    }
    if (!email) {
      errors.email = 'Please Enter Email';
    } else if (!email.includes('@') || !email.includes('.com') || !email.includes('gmail')) {
      errors.email = 'Valid Email';
    }
    if (!password) {
      errors.password = 'Enter Password';
    } else if (password.length < 8) {
      errors.password = 'Enter Password of 8 characters';
    }
    if (!reenter) {
      errors.reenter = 'Enter Password';
    } else if (reenter.length < 8) {
      errors.reenter = 'Enter Correct Password';
    } else if (password !== reenter) {
      errors.reenter = 'Password not matched';
    }
    return errors;
  };

  const handleSignUp = async (email, password) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods && signInMethods.length > 0) {
        // Email is already registered with an existing account
        return Promise.reject({
          code: 'auth/email-already-in-use',
          message: 'The email address is already in use by another account.',
        });
      } else {
        // Email is not registered, proceed with account creation
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Success, handle account creation
        console.log('Account created');
        
        // Get the user's UID after successful account creation
        const userUid = userCredential.user.uid;
  
        // Determine the path based on the role
        const profilePath = role === 0 ? 'User' : 'Doctor';
  
        // Create the userData object based on the role
        const userData = {
          Id: userUid,
          user: name,
          phonenumber: phone,
          email: email,
          password: password,
          role: role,
        };
  
        // Save user data to Firestore
        await setDoc(doc(db, profilePath, userUid), userData);
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // Handle the case where the email is already in use
        setErrors({ email: 'Email already in use' });
      } else if (error.code === 'auth/invalid-email') {
        // Handle the case where the provided email is invalid
        setErrors({ email: 'Email is invalid' });
      } else {
        // Handle other error cases if needed
        setErrors({});
        setShowErrors(false);
        console.log(error);
      }
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
                {errors.name && (<h2 className='text-x font-thin text-red-800'>{errors.name}</h2>)}
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
                {errors.email && (<h2 className='text-x font-thin text-red-800'>{errors.email}</h2>)}
              </div>
              <div className='space-y-2'>
                <label className='mb-5 text-sm font-medium tracking-wide text-gray-700'>Số điện thoại</label>
                <input
                  className='content-center w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='number'
                  placeholder='Số điện thoại'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (<h2 className='text-x font-thin text-red-800'>{errors.phone}</h2>)}
              </div>
              <div className='space-y-2'>
                <label className='mb-5 text-sm font-medium tracking-wide text-gray-700'>Mật khẩu</label>
                <input
                  className='content-center w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='password'
                  placeholder='Nhập mật khẩu'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (<h2 className='text-x font-thin text-red-800'>{errors.password}</h2>)}
              </div>
              <div className='space-y-2'>
                <label className='mb-5 text-sm font-medium tracking-wide text-gray-700'>Nhập lại mật khẩu</label>
                <input
                  className='content-center w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400'
                  type='password'
                  placeholder='Nhập lại mật khẩu'
                  value={reenter}
                  onChange={(e) => setReenter(e.target.value)}
                />
                {errors.reenter && (<h2 className='text-x font-thin text-red-800'>{errors.reenter}</h2>)}
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <Link to={path.login} className='text-green-400 hover:text-green-500'>
                    Đã có tài khoản ?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  onClick={handleRegister}
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
  );
}
