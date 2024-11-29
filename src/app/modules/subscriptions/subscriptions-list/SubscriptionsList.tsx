import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { SubscriptionsListHeader } from './components/header/SubscriptionsListHeader'
import { SubscriptionsTable } from './table/SubscriptionsTable'
import { SubscriptionEditModal } from './subscription-edit-modal/SubscriptionEditModal'
import { KTCard } from '../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../_metronic/layout/components/content'

const SubscriptionsList = () => {
  const { itemIdForUpdate } = useListView()
  return (
    <>
      <KTCard>
        <SubscriptionsListHeader />
        <SubscriptionsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <SubscriptionEditModal />}
    </>
  )
}

const SubscriptionsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <SubscriptionsList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { SubscriptionsListWrapper }
