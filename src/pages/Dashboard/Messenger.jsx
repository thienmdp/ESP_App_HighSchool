import SidebarMessenger from './Messenger/SidebarMessenger'
import ChatMessenger from './Messenger/ChatMessenger'
import styled from 'styled-components'

const Styled = styled.div`
  .container {
    max-width: 100%;
    display: flex;
    .ChatMessenger {
      flex: 1;
      .ChatInfo {
        height: 12%;
        border-left: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
        border-radius: 0px 10px 0px 0px;
        display: flex;
        align-items: center;
        padding: 10px;
        color: aliceblue;
      }
      .InputMessenger {
        border-radius: 0px 0px 10px 0px;
        outline: none;
      }
      .MessagesMessenger {
        .MessageMessenger {
          display: flex;
          gap: 20px;
          max-height: fit-content;
          .MessageInfo {
            display: flex;
            flex-direction: column;
            color: rgb(26, 143, 42);
            font-weight: 400;
            margin-bottom: 50px;

            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .MessageContent {
            max-width: 80%;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
        }
      }
    }
    .SidebarMessenger {
      flex: 0.3;
      display: flex;
      flex-direction: column;

      .NavbarMessenger {
        display: flex;
        align-items: center;
        padding: 20px;
        height: 50px;
        border-bottom: 1px solid whitesmoke;
        justify-content: space-between;
        height: 12%;
        color: aliceblue;
        border-radius: 10px 0px 0px 10px;
      }

      .SearchMessenger {
        .SearchForm {
          border-bottom: 0.1px solid whitesmoke;
        }
      }
      .UserChat {
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: rgb(255, 255, 255);
        cursor: pointer;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }
`
export default function Messenger() {
  return (
    <Styled>
      <div className='w-full h-full mx-auto  '>
        <div className='container p-8 bg-green-400 !w-full h-full '>
          <SidebarMessenger />
          <ChatMessenger />
        </div>
      </div>
    </Styled>
  )
}
