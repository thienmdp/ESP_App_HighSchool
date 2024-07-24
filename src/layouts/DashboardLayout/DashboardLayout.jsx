import styled from 'styled-components'
import Sidebar from './Sidebar/Sidebar'
const Styled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
export default function DashboardLayout({ children }) {
  return (
    <Styled>
      <div></div>
      <Sidebar />
      {children}
    </Styled>
  )
}
