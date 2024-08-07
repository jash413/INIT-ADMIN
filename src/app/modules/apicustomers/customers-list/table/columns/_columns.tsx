import { Column } from "react-table";
import { CustomerInfoCell } from "./CustomerInfoCell";
import { CustomerActionsCell } from "./CustomerActionsCell";
import { CustomerSelectionCell } from "./CustomerSelectionCell";
import { CustomerCustomHeader } from "./CustomerCustomHeader";
import { CustomerSelectionHeader } from "./CustomerSelectionHeader";
import { Customer } from "../../core/_models";
import moment from "moment";

const customersColumns: ReadonlyArray<Column<Customer>> = [
  {
    Header: (props) => <CustomerSelectionHeader tableProps={props} />,
    id: "selection",
    Cell: ({ ...props }) => (
      <CustomerSelectionCell id={props.data[props.row.index].id} />
    ),
  },
  {
    Header: "SR.NO",
    Cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title="ID" />
    ),
    accessor: "id",
    Cell: ({ ...props }) => <CustomerInfoCell customer={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title="Registration Code" />
    ),
    accessor: "REG_CODE",
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title="Name" />
    ),
    accessor: "CUS_NAME",
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title="Address" />
    ),
    accessor: "CUS_ADDR",
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title="Company Name" />
    ),
    accessor: "CMP_NAME",
  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title="Notification Date" />
    ),
    accessor: "notification_date",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),

  },
  {
    Header: (props) => (
      <CustomerCustomHeader tableProps={props} title="Created By" />
    ),
    accessor: "CREATED_BY",
  },
  {
    Header: (props) => (
      <CustomerCustomHeader
        tableProps={props}
        title="Actions"
        className="text-end min-w-100px"
      />
    ),
    id: "actions",
    Cell: ({ ...props }) => (
      <CustomerActionsCell id={props.data[props.row.index].id} />
    ),
  },
];

export { customersColumns };
