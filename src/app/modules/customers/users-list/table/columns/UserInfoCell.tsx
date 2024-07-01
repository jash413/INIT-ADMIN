import {FC} from 'react'
import {User} from '../../core/_models'
import { Link } from 'react-router-dom'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='d-flex flex-column'>
      <Link to={`/customer-profile/${user.CUS_CODE}/`} className='text-gray-800 text-hover-primary mb-1'>
        {user.CUS_CODE}
      </Link>
    </div>
  </div>
)

export {UserInfoCell}
