import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {CustomersListHeader} from './components/header/CustomersListHeader'
import {CustomersTable} from './table/CustomersTable'
import {CustomerEditModal} from './customer-edit-modal/CustomerEditModal'
import {KTCard} from '../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../_metronic/layout/components/content'

const CustomersList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <CustomersListHeader />
        <CustomersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CustomerEditModal />}
    </>
  )
}

const CustomersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <CustomersList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CustomersListWrapper}
