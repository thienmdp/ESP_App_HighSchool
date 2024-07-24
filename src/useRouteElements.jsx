import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import MainLayout from './layouts/MainLayout/MainLayout'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
import Messenger from './pages/Dashboard/Messenger'
import ExamsTest from './pages/Dashboard/ExamsTest'

function ProtectedRoute() {
  // const { isAuthenticated } = useContext(AppContext);
  const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  // const { isAuthenticated } = useContext(AppContext);
  const isAuthenticated = false
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  return useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <MainLayout>
              <Login />
            </MainLayout>
          )
        },
        {
          path: path.register,
          element: (
            <MainLayout>
              <Register />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: path.landing,
      index: true,
      element: (
        <MainLayout>
          <Landing />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.dashboard,
          element: (
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          )
        },
        {
          path: path.messenger,
          element: (
            <DashboardLayout>
              <Messenger />
            </DashboardLayout>
          )
        },
        {
          path: path.examsTest,
          element: (
            <DashboardLayout>
              <ExamsTest />
            </DashboardLayout>
          )
        }
      ]
    }
  ])
}
