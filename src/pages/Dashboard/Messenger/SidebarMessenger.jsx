import NavbarMessenger from './NavbarMessenger'
import SearchMessenger from './SearchMessenger'
import ChatsMessenger from './ChatsMessenger'

export default function SidebarMessenger() {
  return (
    <div className='SidebarMessenger '>
      <NavbarMessenger />
      <SearchMessenger />
      <ChatsMessenger />
    </div>
  )
}
