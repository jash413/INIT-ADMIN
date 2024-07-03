import React, {useEffect, useState} from 'react'
import {Column} from 'react-table'
import {EmployeeInfoCell} from './EmployeeInfoCell'
import {EmployeeActionsCell} from './EmployeeActionsCell'
import {EmployeeSelectionCell} from './EmployeeSelectionCell'
import {EmployeeCustomHeader} from './EmployeeCustomHeader'
import {EmployeeSelectionHeader} from './EmployeeSelectionHeader'
import {Employee} from '../../core/_models'
import {getAdminById} from '../../../../customers/users-list/core/_requests'
import moment from 'moment'

const employeesColumns: ReadonlyArray<Column<Employee>> = [
  {
    Header: (props) => <EmployeeSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <EmployeeSelectionCell id={props.data[props.row.index].EMP_CODE} />,
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
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Mobile Number' />,
    accessor: 'MOB_NMBR',
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Subscription Start Date' />,
    accessor: 'SUB_STDT',
    Cell: ({value}) => moment(value).format('YYYY-MM-DD'),
  },
  {
    Header: (props) => <EmployeeCustomHeader tableProps={props} title='Subscription End Date' />,
    accessor: 'SUB_ENDT',
    Cell: ({value}) => moment(value).format('YYYY-MM-DD'),
  },
  {
    Header: (props) => (
      <EmployeeCustomHeader tableProps={props} title="Created At" />
    ),
    accessor: "CREATED_AT",
    Cell: ({ value }) =>
      value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : "Not Available",
  },
  {
    Header: (props) => (
      <EmployeeCustomHeader tableProps={props} title="Created By" />
    ),
    accessor: "ad_id",
    Cell: ({ value }) => {
      const [admin, setAdmin] = useState<string | undefined>(undefined);
      useEffect(() => {
        getAdminById(value).then((data) => {
          setAdmin(data.data.ad_name);
        });
      }, []);
      return admin;
    },
  },
  {
    Header: (props) => (
      <EmployeeCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <EmployeeActionsCell id={props.data[props.row.index].EMP_CODE} />,
  },
]

export {employeesColumns}
