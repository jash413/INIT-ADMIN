import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserSelectionCell } from "./UserSelectionCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserSelectionHeader } from "./UserSelectionHeader";
import { User } from "../../core/_models";
import { getAdminById } from "../../core/_requests";
import moment from "moment";

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: "selection",
    Cell: ({ ...props }) => (
      <UserSelectionCell id={props.data[props.row.index].CUS_CODE} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Code" />
    ),
    accessor: "CUS_CODE",
    Cell: ({ ...props }) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Name" />
    ),
    accessor: "CUS_NAME",
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Ph Number" />
    ),
    accessor: "PHO_NMBR",
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Sync Date" />
    ),
    accessor: "SYN_DATE",
    Cell: ({ value }) =>
      value ? moment(value).format("DD/MM/YYYY") : "Yet to Sync",
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Contact Person" />
    ),
    accessor: "CON_PERS",
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Last Login" />
    ),
    accessor: "LOG_INDT",
    Cell: ({ value }) =>
      value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : "Never Logged In",
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Created At" />
    ),
    accessor: "CREATED_AT",
    Cell: ({ value }) =>
      value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : "Not Available",
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Created By" />
    ),
    accessor: "ad_id",
    Cell: ({ value }) => {
      const [admin, setAdmin] = useState<string | undefined>(undefined);
      useEffect(() => {
        getAdminById(value).then((data) => {
          setAdmin(data.data.ad_name);
          console.log(data);
        });
      }, []);
      return admin;
    },
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title="Status" />,
    accessor: "is_active",
    Cell: ({ value }) => (
      <span className={`badge badge-light-${value ? "success" : "danger"}`}>
        {value ? "Active" : "Inactive"}
      </span>
    ),
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
      <UserActionsCell id={props.data[props.row.index].CUS_CODE} />
    ),
  },
];

export { usersColumns };
