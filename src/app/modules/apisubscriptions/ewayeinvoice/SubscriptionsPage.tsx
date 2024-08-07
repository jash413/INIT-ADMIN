import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {SubscriptionsListWrapper} from './subscriptions-list/SubscriptionList'

const subscriptionsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Subscription Management',
    path: '/api-ewayeinvoice-subscription-management/subscriptions',
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

const SubscriptionsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='subscriptions'
          element={
            <>
              <PageTitle breadcrumbs={subscriptionsBreadcrumbs}>Eway/Einvoice Subscription list</PageTitle>
              <SubscriptionsListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/api-ewayeinvoice-subscription-management/subscriptions' />} />
    </Routes>
  )
}

export default SubscriptionsPage
