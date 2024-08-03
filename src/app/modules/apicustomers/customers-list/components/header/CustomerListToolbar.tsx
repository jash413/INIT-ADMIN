import { KTIcon } from "../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { CustomersListFilter } from "./CustomersListFilter";
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../../core/QueryResponseProvider";
import { FC, useEffect, useState } from "react";
import { Customer } from "../../core/_models";

const columns = [
  "ID",
  "Name",
  "Address",
  "Company Name",
  "Notification Date",
  "Registration Code",
];

const transformData = (
  customer: Customer,
): { [key: string]: any } => {
  return {
    ID: customer.id,
    Name: customer.CUS_NAME,
    Address: customer.CUS_ADDR,
    "Company Name": customer.CMP_NAME,
    "Notification Date": customer.notification_date,
    "Registration Code": customer.REG_CODE,
  };
};

const CustomersListToolbar: FC = () => {
  const { setItemIdForUpdate } = useListView();
  const customers = useQueryResponseData() as Customer[];
  const isLoading = useQueryResponseLoading();
  const [csvData, setCsvData] = useState<string | null>(null);

  const openAddCustomerModal = () => {
    setItemIdForUpdate(null);
  };

  useEffect(() => {
    if (customers) {
      const csv = [columns.join(",")];
      customers.forEach((customer) => {
        const transformed = transformData(customer);
        const row = columns.map((column) => {
          return transformed[column];
        });
        csv.push(row.join(","));
      });
      setCsvData(csv.join("\n"));
    }
  }, [customers]);


  const exportCsv = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "customers_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="d-flex justify-content-end"
      data-kt-customer-table-toolbar="base"
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
      <CustomersListFilter />
      {/* end::Filter */}

      {/* begin::Add customer */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openAddCustomerModal}
      >
        <KTIcon iconName="plus" className="fs-2" />
        Add Customer
      </button>
      {/* end::Add customer */}
    </div>
  );
};

export { CustomersListToolbar };
