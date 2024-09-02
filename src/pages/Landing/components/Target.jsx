import { FaUserDoctor } from 'react-icons/fa6'
import { GiNotebook } from 'react-icons/gi'
import { LiaHandHoldingHeartSolid } from 'react-icons/lia'
import styled from 'styled-components'
import { FaHeartbeat } from 'react-icons/fa'
import { BiPulse } from 'react-icons/bi'
import { IoFootstepsOutline } from 'react-icons/io5'
import { FaHandsHelping } from 'react-icons/fa'

const Styled = styled.div`
  
.Title2 h1 {
    text-align: center;
    color: aliceblue;
    font-size: 80px;
    font-weight: 700;
    margin-top: 70px;
    margin-bottom: -20px;
  }
  .Title2 p {
    text-align: center;
    font-weight: 600;
    color: rgb(187, 230, 198);
  }
  .Title2 {
    margin-bottom: 70px;
  }
  .content1 {
    display: flex; /* Kích hoạt flexbox */
    flex-direction: row; /* Sắp xếp các thành phần theo hàng */
    justify-content: space-around; /* Cách đều các thành phần */
    align-items: center; /* Căn giữa các thành phần theo chiều dọc */
    width: 206.015vh;
  }

  .object1 {
    display: flex; /* Kích hoạt flexbox cho mỗi thành phần */
    flex-direction: column; /* Sắp xếp nội dung trong mỗi thành phần theo cột */
    align-items: center; /* Căn giữa nội dung trong mỗi thành phần theo chiều ngang */
    margin: 10px; /* Khoảng cách giữa các thành phần */
    background-color: transparent;
    padding: 11px;
    border-radius: 20px;
    font-size: 20px;
    color: aliceblue;
    backdrop-filter: blur(2px);
    background-color: rgba(155, 201, 132, 0.5);
  }
  .icon {
    font-size: 120px;
    padding-bottom: 20px;
  }
  
  .Title3 h1 {
    text-align: center;
    color: aliceblue;
    font-size: 40px;
    font-weight: 700;
    margin-top: 70px;
    margin-bottom: -20px;
  }
  .Title3 p {
    text-align: center;
    font-weight: 600;
    color: rgb(187, 230, 198);
    font-size: 20px;
    margin-top: 20px;
  }
  .Title3 {
    margin-bottom: 70px;
  }
  .content2 {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 206.015vh;
  }

  .object2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    background-color: transparent;
    padding: 11px;
    border-radius: 20px;
    font-size: 20px;
    color: aliceblue;
    backdrop-filter: blur(2px);
    background-color: rgba(155, 201, 132, 0.5);
  }

  .Title4 h1 {
    text-align: center;
    color: aliceblue;
    font-size: 40px;
    font-weight: 700;
    margin-top: 70px;
    margin-bottom: -20px;
  }
  .Title4 p {
    text-align: center;
    font-weight: 600;
    color: rgb(187, 230, 198);
    font-size: 20px;
    margin-top: 20px;
  }
  .Title4 {
    margin-bottom: 70px;
  }
  .content3 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 206.015vh;
  }

  .object3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    background-color: transparent;
    padding: 11px;
    border-radius: 20px;
    font-size: 20px;
    color: aliceblue;
    backdrop-filter: blur(2px);
    background-color: rgba(155, 201, 132, 0.5);
  }

  .text-indented {
    text-indent: 20px; /* Thụt vào đầu dòng */
    margin-top: 10px; /* Khoảng cách phía trên đoạn văn */
  }
`

export default function Target() {
  return (
    <Styled>

      <div className='Title2 '>
        <h1>Giải pháp cho sức khoẻ tâm thần</h1>
      </div>
      <div className='pt-12 pr-7 pl-7' style={{ color: 'white', textAlign: 'justify', fontSize: '24px', }}>
        -LNA System là một ứng dụng tiên tiến được thiết kế để hỗ trợ và nâng cao
        sức khỏe tâm thần của người dùng thông qua các công nghệ hiện đại và
        mạng lưới chuyên gia uy tín. Với mục tiêu mang lại sự an tâm và cải thiện
        chất lượng cuộc sống, LNA System cung cấp các dịch vụ đa dạng và toàn diện
        như sau:
      </div>
      <div className='Title2'>
        <h1>ĐIỀU LNA HƯỚNG ĐẾN</h1>
        <p>NgườI bạn tâm giao đáng tin cậy của bạn- your reliable soulmate</p>
      </div>
      <div className='bg-green-600 content1'>
        <div className='object1'>
          <FaUserDoctor className='icon' />
          <p>
            Liên kết, Kết nối với các <br />
            đội ngũ bác sĩ, y tế, cơ sở <br />
            dữ liệu đáng tin cậy
          </p>
        </div>
        <div className='object1'>
          <GiNotebook className='icon' />
          <p>
            Cung cấp các thông tin, chuẩn
            <br /> đoán các bệnh tâm lý phổ biến
            <br /> ở các bạn học sinh hiện nay
          </p>
        </div>
        <div className='object1'>
          <LiaHandHoldingHeartSolid className='icon' />
          <p>
            Tư vấn, điều trị cho các học sinh <br />
            có dấu hiệu của bệnh trầm
            <br /> cảm hay rối loạn cảm xúc, mau <br />
            chống phát hiện và chữa lành{' '}
          </p>
        </div>
      </div>

      <div className="Title3">
        <h1>Sử dụng đồng hồ thông minh để theo dõi sức khoẻ</h1>
        <p>bằng cách lấy thông tin</p>
      </div>
      <div className="bg-green-600 content2 ml-16">
        <div className="object2">
          <FaHeartbeat className="icon" />
          <p>Nhịp tim</p>
        </div>
        <div className="object2">
          <BiPulse className="icon" />
          <p>Nồng độ SpO2</p>
        </div>
        <div className="object2">
          <IoFootstepsOutline className="icon" />
          <p>Bước chân</p>
        </div>
        <div className="object2">
          <p className="text-indented">
            =&gt; Tính toán ra hiệu suất của giấc ngủ, theo dõi và đồng hành cùng bệnh nhân đến lúc cải thiện<br />
          </p>
        </div>
      </div>

      <div className="Title4">
        <h1>Hướng tới cộng đồng</h1>
        <p>Nhằm giúp giải quyết các vấn đề tâm lý ở các bạn học sinh hiện nay</p>
        <p>cãi thiện sức khoẻ tinh thần, tâm lý của các bạn học sinh</p>
      </div>
      <div className="bg-green-600 content3">
        <div className="object3">
          <FaHandsHelping className="icon" />
          <p>Hỗ trợ cộng đồng</p>
        </div>
      </div>
    </Styled>
  )
}
