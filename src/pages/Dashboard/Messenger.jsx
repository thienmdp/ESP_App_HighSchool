
import SidebarMessenger from "./Messenger/SidebarMessenger";
import ChatMessenger from "./Messenger/ChatMessenger";
import "../Dashboard/Messenger/MessengerStyle.css"


export default function Messenger() {
  return <div className="w-5/6 mx-auto p-8 h-screen">
    
    <div className="p-8 bg-green-400 rounded-lg container">
      <SidebarMessenger />
      <ChatMessenger/>      
    </div>
  </div>
}
