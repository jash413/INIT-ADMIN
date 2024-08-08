import { KTIcon } from "../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { UsersListFilter } from "./UsersListFilter";
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../../core/QueryResponseProvider";
import { FC, useEffect, useState } from "react";
import { User } from "../../core/_models";

const columns = [
  "ID",
  "GST CODE",
  "GST NUMBER",
  "EMAIL",
  "PASSWORD",
  "STATUS",
  "CREATED ON",
  "CREATED BY",
  "IS ADMIN",
  "LAST LOGIN",
];

const transformData = (
  user: User,
): { [key: string]: any } => {
  return {
    ID: user.id,
    "GST CODE": user.GST_CODE,
    "GST NUMBER": user.GST_NMBR,
    EMAIL: user.USR_ID,
    PASSWORD: user.USR_PASS,
    STATUS: user.USR_ACTV,
    "CREATED ON": user.CREATED_ON,
    "CREATED BY": user.CREATED_BY,
    "IS ADMIN": user.is_admin,
    "LAST LOGIN": user.last_login,
  };
};

const UsersListToolbar: FC = () => {
  const { setItemIdForUpdate } = useListView();
  const users = useQueryResponseData() as User[];
  const isLoading = useQueryResponseLoading();
  const [csvData, setCsvData] = useState<string | null>(null);

  const openAddUserModal = () => {
    setItemIdForUpdate(null);
  };

  useEffect(() => {
    if (users) {
      const csv = [columns.join(",")];
      users.forEach((user) => {
        const transformed = transformData(user);
        const row = columns.map((column) => {
          return transformed[column];
        });
        csv.push(row.join(","));
      });
      setCsvData(csv.join("\n"));
    }
  }, [users]);


  const exportCsv = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "users_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="d-flex justify-content-end"
      data-kt-user-table-toolbar="base"
    >
      {/* begin::Export */}
      <button
        type="button"
        className="btn btn-light-primary me-3"
        onClick={exportCsv}
        disabled={isLoading || !csvData}
      >
        <KTIcon iconName="exit-up" className="fs-2" />
        Export
      </button>
      {/* end::Export */}

      {/* begin::Filter */}
      <UsersListFilter />
      {/* end::Filter */}

      {/* begin::Add user */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openAddUserModal}
      >
        <KTIcon iconName="plus" className="fs-2" />
        Add User
      </button>
      {/* end::Add user */}
    </div>
  );
};

export { UsersListToolbar };
