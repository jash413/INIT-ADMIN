import {KTIcon} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

const SubscriptionsListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddSubscriptionModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={openAddSubscriptionModal}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Subscription
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {SubscriptionsListToolbar}
