import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UserList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/api-user-management/users',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='users'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>User list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/api-user-management/users' />} />
    </Routes>
  )
}

export default UsersPage
