import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {CustomersListWrapper} from './customers-list/CustomerList'

const customersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Customer Management',
    path: '/api-customer-management/customers',
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

const CustomersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='customers'
          element={
            <>
              <PageTitle breadcrumbs={customersBreadcrumbs}>Customer list</PageTitle>
              <CustomersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/api-customer-management/customers' />} />
    </Routes>
  )
}

export default CustomersPage
