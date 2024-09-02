import { Link } from 'react-router-dom'
import path from '../../constants/path'
import styled from 'styled-components'
import Logo from '../../../public/assets/picture/Logo-LnA.png'

const Styled = styled.div`
  a {
    text-decoration: none;
  }
  .header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    width: 100%;
  }
  .logo {
    font-size: 32px;
    color: #fff;
    font-weight: 700;
  }
  .navbar a {
    position: relative;
    font-size: 17px;
    font-weight: 600;
    margin-left: 30px;
    color: #ffffff;
  }
  .navbar a::before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #fff;
    top: 100%;
    left: 0;
    transition: 0.2s;
  }
  .navbar a:hover::before {
    width: 100%;
  }

  .header .logo img {
    width: 185px;
    height: auto;
  }
`
export default function Header() {
  return (
    <Styled>
      <header className='bg-green-900/50 header'>
        <a href='/' className='px-4 bg-white rounded-lg logo'>
          <img src={Logo} alt='' />
        </a>

        <nav className='navbar'>
          <Link to={path.landing}>Trang chính</Link>
          <Link to={path.examsTest}>Bài kiểm tra</Link>
          <Link to={path.register}>Đăng ký</Link>
          <Link to={path.login}>Đăng nhập</Link>
        </nav>
      </header>
    </Styled>
  )
}
