import { KTIcon } from "../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { UsersListFilter } from "./UsersListFilter";
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../../core/QueryResponseProvider";
import { FC, useEffect, useState } from "react";
import { User } from "../../core/_models";
import { getAdminById } from "../../core/_requests";

const columns = [
  "Code",
  "Name",
  "Phone",
  "Sync date",
  "Contact person",
  "Last login",
  "Created by",
  "Created date time",
  "Status",
];

const transformData = (
  user: User,
  adminName: string | undefined
): { [key: string]: any } => {
  return {
    Code: user.CUS_CODE,
    Name: user.CUS_NAME,
    Phone: user.PHO_NMBR,
    "Sync date": user.SYN_DATE
      ? new Date(user.SYN_DATE).toLocaleDateString()
      : "",
    "Contact person": user.CON_PERS,
    "Last login": user.LOG_INDT
      ? new Date(user.LOG_INDT).toLocaleDateString()
      : "",
    "Created by": adminName,
    "Created date time": user.CREATED_AT
      ? new Date(user.CREATED_AT).toLocaleString()
      : "",
    Status: user.is_active ? "Active" : "Inactive",
  };
};

const UsersListToolbar: FC = () => {
  const { setItemIdForUpdate } = useListView();
  const users = useQueryResponseData() as User[];
  const isLoading = useQueryResponseLoading();
  const [csvData, setCsvData] = useState<string | null>(null);
  const [adminNames, setAdminNames] = useState<{ [key: string]: string }>({});

  const openAddUserModal = () => {
    setItemIdForUpdate(null);
  };

  useEffect(() => {
    const fetchAdminNames = async () => {
      const adminIds = Array.from(
        new Set(
          users.map((user) => user.ad_id).filter((id) => id !== undefined)
        )
      );
      const adminNamesData: { [key: string]: string } = {};
      await Promise.all(
        adminIds.map(async (id) => {
          const data = await getAdminById(id);
          adminNamesData[id as string] = data.data.ad_name;
        })
      );
      setAdminNames(adminNamesData);
    };

    if (users.length > 0) {
      fetchAdminNames();
    }
  }, [users]);

  useEffect(() => {
    if (users.length > 0 && Object.keys(adminNames).length > 0) {
      const csvRows = [
        columns.join(","), // CSV header row
        ...users.map((user) => {
          const adminName = adminNames[user.ad_id as string];
          const transformedUser = transformData(user, adminName);
          return columns
            .map((column) => JSON.stringify(transformedUser[column]))
            .join(",");
        }),
      ];
      const csv = csvRows.join("\n");
      setCsvData(csv);
    }
  }, [users, adminNames]);

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
        Add Customer
      </button>
      {/* end::Add user */}
    </div>
  );
};

export { UsersListToolbar };
