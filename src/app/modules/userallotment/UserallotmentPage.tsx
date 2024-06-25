import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'

const userallotmentBreadCrumbs: Array<PageLink> = [
  {
    title: 'User Allotment',
    path: '/userallotment/overview',
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

const UserallotmentPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <ToolbarWrapper />
            <Outlet />
          </>
        }
      >
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={userallotmentBreadCrumbs}>Overview</PageTitle>
              <Overview />
            </>
          }
        />
        <Route index element={<Navigate to='/userallotment/overview' />} />
      </Route>
    </Routes>
  )
}

export default UserallotmentPage
