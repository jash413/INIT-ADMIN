import { KTIcon } from "../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { SubscriptionsListFilter } from "./SubscriptionsListFilter";
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../../core/QueryResponseProvider";
import { FC, useEffect, useState } from "react";
import { Subscription } from "../../core/_models";
import {
  getAdminById,
  getUserById,
} from "../../../../customers/users-list/core/_requests";

const columns = [
  "Customer Name",
  "Subscription Code",
  "Start Date",
  "End Date",
  "License Users",
  "Invoice No",
  "Invoice Date",
  "Created By",
  "Created DateTime",
  "Customer Code",
  "Plan Code",
];

const transformData = (
  subscription: Subscription,
  adminName: string | undefined,
  companyName: string | undefined
): { [key: string]: any } => {
  return {
    "Customer Name": companyName,
    "Subscription Code": subscription.SUB_CODE,
    "Start Date": subscription.SUB_STDT
      ? new Date(subscription.SUB_STDT).toLocaleDateString()
      : "",
    "End Date": subscription.SUB_ENDT
      ? new Date(subscription.SUB_ENDT).toLocaleDateString()
      : "",
    "License Users": subscription.LIC_USER,
    "Invoice No": subscription.SUB_ORDN,
    "Invoice Date": subscription.INV_DATE
      ? new Date(subscription.INV_DATE).toLocaleDateString()
      : "",
    "Created By": adminName,
    "Created DateTime": subscription.CREATED_AT
      ? new Date(subscription.CREATED_AT).toLocaleString()
      : "",
    "Customer Code": subscription.CUS_CODE,
    "Plan Code": subscription.PLA_CODE,
  };
};

const SubscriptionsListToolbar: FC = () => {
  const { setItemIdForUpdate } = useListView();
  const subscriptions = useQueryResponseData() as Subscription[];
  const isLoading = useQueryResponseLoading();
  const [csvData, setCsvData] = useState<string | null>(null);
  const [adminNames, setAdminNames] = useState<{ [key: string]: string }>({});
  const [companyNames, setCompanyNames] = useState<{ [key: string]: string }>(
    {}
  );

  const openAddSubscriptionModal = () => {
    setItemIdForUpdate(null);
  };

  useEffect(() => {
    const fetchAdminNames = async () => {
      const adminIds = Array.from(
        new Set(
          subscriptions
            .map((subscription) => subscription.ad_id)
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

    if (subscriptions.length > 0) {
      fetchAdminNames();
    }
  }, [subscriptions]);

  useEffect(() => {
    const fetchCompanyNames = async () => {
      const companyIds = Array.from(
        new Set(
          subscriptions
            .map((subscription) => subscription.CUS_CODE)
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

    if (subscriptions.length > 0) {
      fetchCompanyNames();
    }
  }, [subscriptions]);

  useEffect(() => {
    if (subscriptions.length > 0 && Object.keys(adminNames).length > 0) {
      const csvRows = [
        columns.join(","), // CSV header row
        ...subscriptions.map((subscription) => {
          const adminName = adminNames[subscription.ad_id as string];
          const companyName = companyNames[subscription.CUS_CODE as string];
          const transformedUser = transformData(
            subscription,
            adminName,
            companyName
          );
          return columns
            .map((column) => JSON.stringify(transformedUser[column]))
            .join(",");
        }),
      ];
      const csv = csvRows.join("\n");
      setCsvData(csv);
    }
  }, [subscriptions, adminNames, companyNames]);

  const exportCsv = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "subscriptions_data.csv");
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
      <SubscriptionsListFilter />
      {/* end::Filter */}

      {/* begin::Add user */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openAddSubscriptionModal}
      >
        <KTIcon iconName="plus" className="fs-2" />
        Add Subscription
      </button>
      {/* end::Add user */}
    </div>
  );
};

export { SubscriptionsListToolbar };
