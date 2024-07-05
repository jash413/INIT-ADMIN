import { KTIcon } from "../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { EmployeesListFilter } from "./EmployeesListFilter";
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../../core/QueryResponseProvider";
import { FC, useEffect, useState } from "react";
import { Employee } from "../../core/_models";
import {
  getAdminById,
  getUserById,
} from "../../../../customers/users-list/core/_requests";

const columns = [
  "Employee Name",
  "Employee Code",
  "Employee Phone",
  "Company Name",
  "Subscription Code",
  "Start Date",
  "End Date",
  "Alloted By",
  "Alloted Date",
  "Is Admin",
];

const transformData = (
  employee: Employee,
  adminName: string | undefined,
  companyName: string | undefined
): { [key: string]: any } => {
  return {
    "Employee Name": employee.EMP_NAME,
    "Employee Code": employee.EMP_CODE,
    "Employee Phone": employee.MOB_NMBR,
    "Company Name": companyName,
    "Subscription Code": employee.SUB_CODE,
    "Start Date": employee.SUB_STDT
      ? new Date(employee.SUB_STDT).toLocaleDateString()
      : "",
    "End Date": employee.SUB_ENDT
      ? new Date(employee.SUB_ENDT).toLocaleDateString()
      : "",
    "Alloted By": adminName,
    "Alloted Date": employee.CREATED_AT
      ? new Date(employee.CREATED_AT).toLocaleString()
      : "",
    "Is Admin": employee.USR_TYPE ? "Yes" : "No",
  };
};

const EmployeesListToolbar: FC = () => {
  const { setItemIdForUpdate } = useListView();
  const employees = useQueryResponseData() as Employee[];
  const isLoading = useQueryResponseLoading();
  const [csvData, setCsvData] = useState<string | null>(null);
  const [adminNames, setAdminNames] = useState<{ [key: string]: string }>({});
  const [companyNames, setCompanyNames] = useState<{ [key: string]: string }>(
    {}
  );

  const openAddEmployeeModal = () => {
    setItemIdForUpdate(null);
  };

  useEffect(() => {
    const fetchAdminNames = async () => {
      const adminIds = Array.from(
        new Set(
          employees
            .map((employee) => employee.ad_id)
            .filter((id) => id !== undefined)
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

    if (employees.length > 0) {
      fetchAdminNames();
    }
  }, [employees]);

  useEffect(() => {
    const fetchCompanyNames = async () => {
      const companyIds = Array.from(
        new Set(
          employees
            .map((employee) => employee.CUS_CODE)
            .filter((id) => id !== undefined)
        )
      );
      const companyNamesData: { [key: string]: string } = {};
      await Promise.all(
        companyIds.map(async (id) => {
          const data = await getUserById(id);
          if (data && data.CUS_NAME)
            companyNamesData[id as string] = data.CUS_NAME;
        })
      );
      setCompanyNames(companyNamesData);
    };

    if (employees.length > 0) {
      fetchCompanyNames();
    }
  }, [employees]);

  useEffect(() => {
    if (employees.length > 0 && Object.keys(adminNames).length > 0) {
      const csvRows = [
        columns.join(","), // CSV header row
        ...employees.map((employee) => {
          const adminName = adminNames[employee.ad_id as string];
          const companyName = companyNames[employee.CUS_CODE as string];
          const transformedUser = transformData(employee, adminName, companyName);
          return columns
            .map((column) => JSON.stringify(transformedUser[column]))
            .join(",");
        }),
      ];
      const csv = csvRows.join("\n");
      setCsvData(csv);
    }
  }, [employees, adminNames, companyNames]);

  const exportCsv = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "employees_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="d-flex justify-content-end"
      data-kt-employee-table-toolbar="base"
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
      <EmployeesListFilter />
      {/* end::Filter */}

      {/* begin::Add employee */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openAddEmployeeModal}
      >
        <KTIcon iconName="plus" className="fs-2" />
        Add Employee
      </button>
      {/* end::Add employee */}
    </div>
  );
};

export { EmployeesListToolbar };
