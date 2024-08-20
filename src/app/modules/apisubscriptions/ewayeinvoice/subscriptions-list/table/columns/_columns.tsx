import { Column } from "react-table";
import { SubscriptionActionsCell } from "./SubscriptionActionsCell";
import { SubscriptionSelectionCell } from "./SubscriptionSelectionCell";
import { SubscriptionCustomHeader } from "./SubscriptionCustomHeader";
import { SubscriptionSelectionHeader } from "./SubscriptionSelectionHeader";
import { Subscription } from "../../core/_models";
import moment from "moment";

const subscriptionsColumns: ReadonlyArray<Column<Subscription>> = [
  {
    Header: (props) => <SubscriptionSelectionHeader tableProps={props} />,
    id: "selection",
    Cell: ({ ...props }) => (
      <SubscriptionSelectionCell id={props.data[props.row.index].id} />
    ),
  },
  {
    Header: "SR.NO",
    Cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="ID" />
    ),
    accessor: "id",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="CUS NAME" />
    ),
    accessor: "CUS_NAME",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="User Id" />
    ),
    accessor: "user_id",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Sub Id" />
    ),
    accessor: "SUBSCRIPTION_ID",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Sub Date" />
    ),
    accessor: "SUBSCRIPTION_DATE",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Exp Date" />
    ),
    accessor: "expiry_date",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="INV DATE" />
    ),
    accessor: "INV_DATE",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="INV NO" />
    ),
    accessor: "INV_NO",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Alloted Calls" />
    ),
    accessor: "ALLOTED_CALLS",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Used Calls" />
    ),
    accessor: "USED_CALLS",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Pending Calls" />
    ),
    accessor: "PENDING_CALLS",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Is Active" />
    ),
    accessor: "is_active",
    Cell: ({ value }) =>
      value === 1 ? (
        <span className="badge badge-light-success">Active</span>
      ) : (
        <span className="badge badge-light-danger">Inactive</span>
      ),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Created On" />
    ),
    accessor: "created_on",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Created By" />
    ),
    accessor: "created_by",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader
        tableProps={props}
        title="Actions"
        className="text-end min-w-100px"
      />
    ),
    id: "actions",
    Cell: ({ ...props }) => (
      <SubscriptionActionsCell id={props.data[props.row.index].id} />
    ),
  },
];

export { subscriptionsColumns };
