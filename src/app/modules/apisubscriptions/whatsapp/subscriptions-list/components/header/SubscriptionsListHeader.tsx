import {useListView} from '../../core/ListViewProvider'
import {SubscriptionsListToolbar} from './SubscriptionListToolbar'
import {SubscriptionsListGrouping} from './SubscriptionsListGrouping'
import {SubscriptionsListSearchComponent} from './SubscriptionsListSearchComponent'

const SubscriptionsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <SubscriptionsListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <SubscriptionsListGrouping /> : <SubscriptionsListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {SubscriptionsListHeader}
