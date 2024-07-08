import { RouteObject } from 'react-router-dom'

import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Management from '@/pages/Management'
import Board from '@/pages/Board'
import BoardWrite from '@/pages/BoardWrite'
import Mypage from '@/pages/Mypage'
import Signup from '@/pages/Signup'

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
    element: <Board />
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
  }
]
