import {useQuery} from 'react-query'
import {SubscriptionEditModalForm} from './SubscriptionEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getSubscriptionById} from '../core/_requests'

const SubscriptionEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: subscription,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-subscription-${itemIdForUpdate}`,
    () => {
      return getSubscriptionById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <SubscriptionEditModalForm isSubscriptionLoading={isLoading} subscription={{id: undefined}} />
  }

  if (!isLoading && !error && subscription) {
    return <SubscriptionEditModalForm isSubscriptionLoading={isLoading} subscription={subscription} />
  }

  return null
}

export {SubscriptionEditModalFormWrapper}
