import { Column } from "react-table";
import { SubscriptionInfoCell } from "./SubscriptionInfoCell";
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
    Cell: ({ ...props }) => <SubscriptionInfoCell subscription={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Registration Code" />
    ),
    accessor: "REG_CODE",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Name" />
    ),
    accessor: "CUS_NAME",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Address" />
    ),
    accessor: "CUS_ADDR",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Company Name" />
    ),
    accessor: "CMP_NAME",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Notification Date" />
    ),
    accessor: "notification_date",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),

  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Created By" />
    ),
    accessor: "CREATED_BY",
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
