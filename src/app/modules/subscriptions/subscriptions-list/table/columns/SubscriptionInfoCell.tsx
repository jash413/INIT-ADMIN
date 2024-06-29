
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Subscription} from '../../core/_models'

type Props = {
  subscription: Subscription
}

const SubscriptionInfoCell: FC<Props> = ({subscription}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {subscription.CUS_CODE}
      </a>
    </div>
  </div>
)

export {SubscriptionInfoCell}
