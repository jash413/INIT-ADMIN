import {useListView} from '../../core/ListViewProvider'
import {CustomersListToolbar} from './CustomerListToolbar'
import {CustomersListGrouping} from './CustomersListGrouping'
import {CustomersListSearchComponent} from './CustomersListSearchComponent'

const CustomersListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <CustomersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <CustomersListGrouping /> : <CustomersListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {CustomersListHeader}
