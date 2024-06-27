import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].CUS_CODE} />,
  },
  {
    Header: 'Name',
    accessor: 'CUS_NAME',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: 'Email',
    accessor: 'CUS_MAIL',
  },
  {
    Header: 'Phone',
    accessor: 'PHO_NMBR',
  },
  {
    Header: 'Company',
    accessor: 'CUS_ADDR',
  },
  {
    Header: 'Status',
    accessor: 'is_active',
    Cell: ({value}) => (
      <span className={`badge badge-light-${value ? 'success' : 'danger'}`}>{value ? 'Active' : 'Inactive'}</span>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].CUS_CODE} />,
  },
]

export {usersColumns}
