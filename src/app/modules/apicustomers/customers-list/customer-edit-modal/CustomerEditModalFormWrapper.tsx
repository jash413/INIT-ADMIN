import {useQuery} from 'react-query'
import {CustomerEditModalForm} from './CustomerEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getCustomerById} from '../core/_requests'

const CustomerEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: customer,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-customer-${itemIdForUpdate}`,
    () => {
      return getCustomerById(itemIdForUpdate)
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
    return <CustomerEditModalForm isCustomerLoading={isLoading} customer={{id: undefined}} />
  }

  if (!isLoading && !error && customer) {
    return <CustomerEditModalForm isCustomerLoading={isLoading} customer={customer} />
  }

  return null
}

export {CustomerEditModalFormWrapper}
