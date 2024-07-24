import { GoDotFill } from 'react-icons/go'
import styled from 'styled-components'
import background3 from '../../../../public/assets/picture/pexels-phuong-ngo-380081416-16241634.jpg'
const Styled = styled.div`
  .Title {
    text-align: center;
    color: rgb(187, 230, 198);
    font-size: 30px;
    font-weight: 600;
    margin: 70px 0 30px;
  }
  .Title h2 {
    font-size: 80px;
    color: #031b22;
    margin-top: 5px;
    margin-bottom: 5px;
    transform: none;
    color: #fff;
  }
  .homee {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0;
    margin: 0;
  }

  .headerContainer {
    width: auto;
    margin-left: 30px;
  }

  .headerContainer h1 {
    font-size: 30px; /* Ví dụ: 3% chiều rộng viewport */
    height: auto; /* Chiều cao tự động */
    color: rgb(255, 255, 255);
    margin-bottom: 100px; /* Điều chỉnh khoảng cách */
    padding-left: 20px;
    padding-top: 0;
  }

  .headerContainer p {
    font-size: 30px;
    font-weight: lighter;
    color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    margin-top: 20px; /* Điều chỉnh khoảng cách */
  }
`
export default function About() {
  return (
    <Styled>
      <div className='Title'>
        <p>LNA-SYSTEM</p>
        <h2>-Về Chúng tôi-</h2>
      </div>
      <div className='homee' style={{ backgroundImage: `url(${background3})` }}>
        <div className='headerContainer'>
          <h1>
            LNA là một hệ thống tích hợp sản phẩm công nghệ của samsung nhầm sơ cứu và chữa lành cho những học sinh mắc
            chướng ngại tâm lí{' '}
          </h1>
          <p>
            <GoDotFill />
            Hỗ trợ, sơ cứu kịp thời các vấn đề tâm lý của các bạn học sinh chính xác{' '}
          </p>
          <p>
            <GoDotFill /> Cung cấp các phương pháp, đề xuất nhằm tháo gỡ chướng ngại về tâm lý{' '}
          </p>
          <p>
            <GoDotFill />
            đánh giá sức khoẻ tinh thần toàn diện dựa trên các yếu tố như nhịp tim, giấc ngủ, mức độ căng thẳng,...
          </p>
          <p>
            <GoDotFill />
            đa dạng tính năng trên các thiết bị, nền tảng của samsung.{' '}
          </p>
        </div>
      </div>
    </Styled>
  )
}
