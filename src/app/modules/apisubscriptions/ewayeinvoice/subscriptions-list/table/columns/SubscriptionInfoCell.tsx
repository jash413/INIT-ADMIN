import {FC} from 'react'
import {Subscription} from '../../core/_models'
import { Link } from 'react-router-dom'

type Props = {
  subscription: Subscription
}

const SubscriptionInfoCell: FC<Props> = ({subscription}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='d-flex flex-column'>
      <Link to={`/subscription-profile/${subscription.id}/`} className='text-gray-800 text-hover-primary mb-1'>
        {subscription.id}
      </Link>
    </div>
  </div>
)

export {SubscriptionInfoCell}
