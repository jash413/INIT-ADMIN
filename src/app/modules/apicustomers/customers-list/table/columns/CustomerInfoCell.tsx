import {FC} from 'react'
import {Customer} from '../../core/_models'
import { Link } from 'react-router-dom'

type Props = {
  customer: Customer
}

const CustomerInfoCell: FC<Props> = ({customer}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='d-flex flex-column'>
      <Link to={`/api-customer-profile/${customer.id}/`} className='text-gray-800 text-hover-primary mb-1'>
        {customer.id}
      </Link>
    </div>
  </div>
)

export {CustomerInfoCell}
