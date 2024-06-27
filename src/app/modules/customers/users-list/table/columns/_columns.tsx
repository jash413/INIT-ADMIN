import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import moment from 'moment'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].CUS_CODE} />,
  },
  {
    Header: 'Customer Code',
    accessor: 'CUS_CODE',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: 'Customer Name',
    accessor: 'CUS_NAME',
  },
  {
    Header: 'Phone',
    accessor: 'PHO_NMBR',
  },
  {
    Header: 'Sync Date',
    accessor: 'SYN_DATE',
    Cell:  ({value}) => moment(value).format('DD/MM/YYYY'),
  },
  {
    Header: 'Contact Person',
    accessor: 'CON_PERS',
  },
  {
    Header: 'Last Login',
    accessor: 'LOG_INDT',
    Cell:  ({value}) => moment(value).format('DD/MM/YYYY HH:mm:ss'),
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
