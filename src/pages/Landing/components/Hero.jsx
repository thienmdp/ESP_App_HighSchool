import styled from 'styled-components'

const Styled = styled.div`
  .Hero {
    width: 100vw;
    min-height: 70vh;
    background: url('/public/assets/picture/background4.jpg') no-repeat center fixed;
    background-size: cover;
    justify-content: center;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .Hero-text {
    text-align: center;
    max-width: 800px;
    font-weight: 600;
  }
  .Hero-text h1 {
    font-size: 90px;
    font-weight: 600;
  }
  .Hero-text p {
    max-width: 700px;
    margin: 10px auto;
    line-height: 1.4;
    font-size: larger;
  }
`
export default function Hero() {
  return (
    <Styled>
      <div className='Hero bg-green-900'>
        <div className='Hero-text'>
          <h1>LNA System </h1>
          <p>- Hệ thống sơ cứu và chữa lành cho học sinh mắc chướng ngại tâm lý-</p>
        </div>
      </div>
    </Styled>
  )
}
