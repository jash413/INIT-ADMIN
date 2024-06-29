import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Allotment',
    path: '/user-allotment/users',
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
              <PageTitle breadcrumbs={usersBreadcrumbs}>User Allotment List</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/user-allotment/users' />} />
    </Routes>
  )
}

export default UsersPage
