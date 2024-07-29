import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { SubscriptionActionsCell } from "./SubscriptionActionsCell";
import { SubscriptionSelectionCell } from "./SubscriptionSelectionCell";
import { SubscriptionCustomHeader } from "./SubscriptionCustomHeader";
import { SubscriptionSelectionHeader } from "./SubscriptionSelectionHeader";
import { SubscriptionInfoCell } from "./SubscriptionInfoCell";
import { Subscription } from "../../core/_models";
import moment from "moment";

const usersColumns: ReadonlyArray<Column<Subscription>> = [
  {
    Header: (props) => <SubscriptionSelectionHeader tableProps={props} />,
    id: "selection",
    Cell: ({ ...props }) => (
      <SubscriptionSelectionCell id={props.data[props.row.index].SUB_CODE} />
    ),
  },
  {
    Header: "SR.NO",
    Cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Subscription Code" />
    ),
    accessor: "SUB_CODE",
    Cell: ({ ...props }) => (
      <SubscriptionInfoCell subscription={props.data[props.row.index]} />
    ),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Customer Name" />
    ),
    accessor: "customer_name",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Plan Name" />
    ),
    accessor: "plan_description",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader
        tableProps={props}
        title="License Subscription"
      />
    ),
    accessor: "LIC_USER",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Start Date" />
    ),
    accessor: "SUB_STDT",
    Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="End Date" />
    ),
    accessor: "SUB_ENDT",
    Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Invoice Date" />
    ),
    accessor: "INV_DATE",
    Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Invoice Number" />
    ),
    accessor: "SUB_ORDN",
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
    accessor: "admin_name",
  },
  {
    Header: (props) => (
      <SubscriptionCustomHeader tableProps={props} title="Status" />
    ),
    accessor: "status",
    Cell: ({ value }) => (
      <span
        className={`badge badge-light-${value === 1 ? "success" : "danger"}`}
      >
        {value === 1 ? "Active" : "Inactive"}
      </span>
    ),
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
      <SubscriptionActionsCell id={props.data[props.row.index].SUB_CODE} />
    ),
  },
];

export { usersColumns };
