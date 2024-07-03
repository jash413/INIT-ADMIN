import React, {useEffect, useState} from 'react'
import {Column} from 'react-table'
import {SubscriptionActionsCell} from './SubscriptionActionsCell'
import {SubscriptionSelectionCell} from './SubscriptionSelectionCell'
import {SubscriptionCustomHeader} from './SubscriptionCustomHeader'
import {SubscriptionSelectionHeader} from './SubscriptionSelectionHeader'
import {Subscription} from '../../core/_models'
import {getAdminById} from '../../../../customers/users-list/core/_requests'
import moment from 'moment'

const usersColumns: ReadonlyArray<Column<Subscription>> = [
  {
    Header: (props) => <SubscriptionSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SubscriptionSelectionCell id={props.data[props.row.index].SUB_CODE} />,
  },
  {
    Header: (props) => <SubscriptionCustomHeader tableProps={props} title='Subscription Code' />,
    accessor: 'SUB_CODE',
  },
  {
    Header: (props) => <SubscriptionCustomHeader tableProps={props} title='Customer Code' />,
    accessor: 'CUS_CODE',
  },
  {
    Header: (props) => <SubscriptionCustomHeader tableProps={props} title='Plan Code' />,
    accessor: 'PLA_CODE',
  },
  {
    Header: (props) => <SubscriptionCustomHeader tableProps={props} title='License Subscription' />,
    accessor: 'LIC_USER',
  },
  {
    Header: (props) => <SubscriptionCustomHeader tableProps={props} title='Start Date' />,
    accessor: 'SUB_STDT',
    Cell: ({value}) => moment(value).format('YYYY-MM-DD'),
  },
  {
    Header: (props) => <SubscriptionCustomHeader tableProps={props} title='End Date' />,
    accessor: 'SUB_ENDT',
    Cell: ({value}) => moment(value).format('YYYY-MM-DD'),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Created At" />
    ),
    accessor: "CREATED_AT",
    Cell: ({ value }) =>
      value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : "Not Available",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Created By" />
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
    Header: (props) => <SubscriptionCustomHeader tableProps={props} title='Status' />,
    accessor: 'status',
    Cell: ({value}) => (
      <span className={`badge badge-light-${value === 1 ? 'success' : 'danger'}`}>{value === 1 ? 'Active' : 'Inactive'}</span>
    ),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <SubscriptionActionsCell id={props.data[props.row.index].SUB_CODE} />,
  },
]

export {usersColumns}
