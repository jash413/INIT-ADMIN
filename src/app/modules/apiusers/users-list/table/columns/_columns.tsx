import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserSelectionCell } from "./UserSelectionCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserSelectionHeader } from "./UserSelectionHeader";
import { User } from "../../core/_models";
import moment from "moment";

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: "selection",
    Cell: ({ ...props }) => (
      <UserSelectionCell id={props.data[props.row.index].id} />
    ),
  },
  {
    Header: "SR.NO",
    Cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="ID" />,
    accessor: "id",
    Cell: ({ ...props }) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="GST Code" />,
    accessor: "GST_CODE",
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="GST NO" />,
    accessor: "GST_NMBR",
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="Email" />,
    accessor: "USR_ID",
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="Active" />,
    accessor: "USR_ACTV",
    Cell: ({ value }) =>
      value === "1" ? (
        <span className="badge badge-light-success">Active</span>
      ) : (
        <span className="badge badge-light-danger">Inactive</span>
      ),
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="Is Admin" />,
    accessor: "is_admin",
    Cell: ({ value }) =>
      value === "1" ? (
        <span className="badge badge-light-success">Yes</span>
      ) : (
        <span className="badge badge-light-danger">No</span>
      ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Created On" />
    ),
    accessor: "CREATED_ON",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Created By" />
    ),
    accessor: "CREATED_BY",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Actions"
        className="text-end min-w-100px"
      />
    ),
    id: "actions",
    Cell: ({ ...props }) => (
      <UserActionsCell id={props.data[props.row.index].id} />
    ),
  },
];

export { usersColumns };
