import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {EmployeesListWrapper} from './employees-list/EmployeesList'

const employeesBreadcrumbs: Array<PageLink> = [
  {
    title: 'Employee Allotment',
    path: '/employee-allotment/employees',
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

const EmployeesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='employees'
          element={
            <>
              <PageTitle breadcrumbs={employeesBreadcrumbs}>Employee Allotment List</PageTitle>
              <EmployeesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/employee-allotment/employees' />} />
    </Routes>
  )
}

export default EmployeesPage
