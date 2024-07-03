import { KTIcon } from "../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { EmployeesListFilter } from "./EmployeesListFilter";
import { useQueryResponseData, useQueryResponseLoading } from "../../core/QueryResponseProvider";
import { FC, useEffect, useState } from "react";
import { Employee } from "../../core/_models";

const EmployeesListToolbar: FC = () => {
  const { setItemIdForUpdate } = useListView();
  const users = useQueryResponseData() as Employee[];
  const isLoading = useQueryResponseLoading();
  const [csvData, setCsvData] = useState<string | null>(null);

  const openAddEmployeeModal = () => {
    setItemIdForUpdate(null);
  };

  useEffect(() => {
    if (users && users.length > 0) {
      const headers = Object.keys(users[0]);
      const csvRows = [
        headers.join(','), // CSV header row
        ...users.map(user => 
          headers.map(header => 
            JSON.stringify(user[header as keyof Employee])
          ).join(',')
        )
      ];
      const csv = csvRows.join('\n');
      setCsvData(csv);
    }
  }, [users]);

  const exportCsv = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "employees_data.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="d-flex justify-content-end" data-kt-user-table-toolbar="base">
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
      <EmployeesListFilter />
      {/* end::Filter */}

      {/* begin::Add user */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openAddEmployeeModal}
      >
        <KTIcon iconName="plus" className="fs-2" />
        Add Employee
      </button>
      {/* end::Add user */}
    </div>
  );
};

export { EmployeesListToolbar };