import {useEffect, useState} from 'react'
import {Column} from 'react-table'
import {EmployeeActionsCell} from './EmployeeActionsCell'
import {EmployeeSelectionCell} from './EmployeeSelectionCell'
import {EmployeeCustomHeader} from './EmployeeCustomHeader'
import {EmployeeSelectionHeader} from './EmployeeSelectionHeader'
import {Employee} from '../../core/_models'
import {getAdminById, getUserById} from '../../../../customers/users-list/core/_requests'
import moment from 'moment'

const employeesColumns: ReadonlyArray<Column<Employee>> = [
  {
    Header: (props) => <EmployeeSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <EmployeeSelectionCell id={props.data[props.row.index].MOB_NMBR} />,
  },
  {
    Header: "SR.NO",
    Cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Employee Name' />,
    accessor: 'EMP_NAME',
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Employee Code' />,
    accessor: 'EMP_CODE',
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Employee Phone' />,
    accessor: 'MOB_NMBR',
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Company Name' />,
    accessor: 'CUS_CODE',
    Cell: ({value}) => {
      const [customer, setCustomer] = useState<string | undefined>(undefined)
      useEffect(() => {
        getUserById(value).then((data) => {
          setCustomer(data?.CUS_NAME)
        })
      }, [value])
      return customer
    },
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Subscription Code' />,
    accessor: 'SUB_CODE',
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Start Date' />,
    accessor: 'SUB_STDT',
    Cell: ({value}) => moment(value).format('DD/MM/YYYY'),
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='End Date' />,
    accessor: 'SUB_ENDT',
    Cell: ({value}) => moment(value).format('DD/MM/YYYY'),
  },
  {
    Header: (props) => (
      <EmployeeCustomHeader tableProps={props} title="Alloted By" />
    ),
    accessor: "ad_id",
    Cell: ({ value }) => {
      const [admin, setAdmin] = useState<string | undefined>(undefined);
      useEffect(() => {
        getAdminById(value).then((data) => {
          setAdmin(data.data.ad_name);
        });
      }, [value]);
      return admin;
    },
  },
  {
    Header: (props) => (
      <EmployeeCustomHeader tableProps={props} title="Allotment Date" />
    ),
    accessor: "CREATED_AT",
    Cell: ({ value }) =>
      value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : "Not Available",
  },
  {
    Header: "Is Admin",
    accessor: "USR_TYPE",
    Cell: ({ value }) => (value === "1" ? "Yes" : "No"),
  },
  {
    Header: (props) => (
      <EmployeeCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <EmployeeActionsCell id={props.data[props.row.index].MOB_NMBR} />,
  },
]

export {employeesColumns}
