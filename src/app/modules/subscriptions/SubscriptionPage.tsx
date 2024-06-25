import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'

const subscriptionBreadCrumbs: Array<PageLink> = [
  {
    title: 'Subscription',
    path: '/subscription/overview',
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

const SubscriptionPage: React.FC = () => {
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
              <PageTitle breadcrumbs={subscriptionBreadCrumbs}>Overview</PageTitle>
              <Overview />
            </>
          }
        />
        <Route index element={<Navigate to='/subscription/overview' />} />
      </Route>
    </Routes>
  )
}

export default SubscriptionPage
