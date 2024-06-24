import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Settings} from './components/settings/Settings'
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'

const customerBreadCrumbs: Array<PageLink> = [
  {
    title: 'Customer',
    path: '/customer/overview',
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

const CustomerPage: React.FC = () => {
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
              <PageTitle breadcrumbs={customerBreadCrumbs}>Overview</PageTitle>
              <Overview />
            </>
          }
        />
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={customerBreadCrumbs}>Settings</PageTitle>
              <Settings />
            </>
          }
        />
        <Route index element={<Navigate to='/customer/overview' />} />
      </Route>
    </Routes>
  )
}

export default CustomerPage
