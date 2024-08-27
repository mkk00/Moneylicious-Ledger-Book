import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Management = lazy(() => import('@/pages/Management'))
const Board = lazy(() => import('@/pages/Board'))
const BoardDetail = lazy(() => import('@/components/board/BoardDetail'))
const BoardWrite = lazy(() => import('@/pages/BoardWrite'))
const Mypage = lazy(() => import('@/pages/Mypage'))
const Signup = lazy(() => import('@/pages/Signup'))
const LoginRequired = lazy(() => import('@/pages/LoginRequired'))

export const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/management',
    element: <Management />
  },
  {
    path: '/board',
    element: <Board />,
    children: [
      {
        path: ':id',
        element: <BoardDetail />
      }
    ]
  },
  {
    path: '/board/write',
    element: <BoardWrite />
  },
  {
    path: '/mypage',
    element: <Mypage />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/loginRequired',
    element: <LoginRequired />
  }
]
