import { KTIcon } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { SubscriptionsListFilter } from "./SubscriptionsListFilter";
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../../core/QueryResponseProvider";
import { FC, useEffect, useState } from "react";
import { Subscription } from "../../core/_models";

const columns = [
  "GST_CODE",
  "GST_NMBR",
  "SYSTEM_ID",
  "SUBSCRIPTION_ID",
  "SUBSCRIPTION_DATE",
  "ALLOTED_CALLS",
  "USED_CALLS",
  "PENDING_CALLS",
  "is_active",
  "created_on",
  "created_by",
  "user_id",
  "expiry_date",
];

const transformData = (
  subscription: Subscription,
): { [key: string]: any } => {
  return {
    GST_CODE: subscription.GST_CODE,
    GST_NMBR: subscription.GST_NMBR,
    SYSTEM_ID: subscription.SYSTEM_ID,
    SUBSCRIPTION_ID: subscription.SUBSCRIPTION_ID,
    SUBSCRIPTION_DATE: subscription.SUBSCRIPTION_DATE,
    ALLOTED_CALLS: subscription.ALLOTED_CALLS,
    USED_CALLS: subscription.USED_CALLS,
    PENDING_CALLS: subscription.PENDING_CALLS,
    is_active: subscription.is_active,
    created_on: subscription.created_on,
    created_by: subscription.created_by,
    user_id: subscription.user_id,
    expiry_date: subscription.expiry_date,
  };
};

const SubscriptionsListToolbar: FC = () => {
  const { setItemIdForUpdate } = useListView();
  const subscriptions = useQueryResponseData() as Subscription[];
  const isLoading = useQueryResponseLoading();
  const [csvData, setCsvData] = useState<string | null>(null);

  const openAddSubscriptionModal = () => {
    setItemIdForUpdate(null);
  };

  useEffect(() => {
    if (subscriptions) {
      const csv = [columns.join(",")];
      subscriptions.forEach((subscription) => {
        const transformed = transformData(subscription);
        const row = columns.map((column) => {
          return transformed[column];
        });
        csv.push(row.join(","));
      });
      setCsvData(csv.join("\n"));
    }
  }, [subscriptions]);


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
      data-kt-subscription-table-toolbar="base"
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

      {/* begin::Add subscription */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openAddSubscriptionModal}
      >
        <KTIcon iconName="plus" className="fs-2" />
        Add Subscription
      </button>
      {/* end::Add subscription */}
    </div>
  );
};

export { SubscriptionsListToolbar };
