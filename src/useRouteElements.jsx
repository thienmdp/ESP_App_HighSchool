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
import Booking from './pages/Dashboard/Booking'
import Apoinment from './pages/Dashboard/Booking/Apoinment'
import Makeapoinment from './pages/Dashboard/Booking/Makeapoinment'
import Historyapoinment from './pages/Dashboard/Booking/Historyapoinment'
import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'


function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();

  }, []);

  return { user, loading };
}

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to={path.login} />;
}

function RejectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return !user ? <Outlet /> : <Navigate to={path.dashboard} />;
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
          path: path.booking,
          element: (
            <DashboardLayout>
              <Booking />
            </DashboardLayout>
          )
        },
        {
          path: path.apoinment,
          element: (
            <DashboardLayout>
              <Apoinment />
            </DashboardLayout>
          )
        },

        {
          path: path.historyapoinment,
          element: (
            <DashboardLayout>
              <Historyapoinment />
            </DashboardLayout>
          )
        },




        {
          path: path.makeapoinment,
          element: (
            <DashboardLayout>
              <Makeapoinment />
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
