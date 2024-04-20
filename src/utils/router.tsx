import { RouteObject } from 'react-router-dom'

import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Management from '@/pages/Management'
import Board from '@/pages/Board'
import Mypage from '@/pages/Mypage'

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
    path: '/mypage',
    element: <Mypage />
  }
]
