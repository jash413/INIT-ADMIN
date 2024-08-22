import { FC, useEffect, useState } from "react";
import {
  getSubscriptionsByDateRange,
  updateSubscription,
} from "../../../../app/modules/apicustomerprofile/subscriptionCore/_requests";
import moment from "moment";
import { Subscription } from "../../../../app/modules/apicustomerprofile/subscriptionCore/_models";

type Props = {
  className: string;
};

const ApiSubscriptionTable: FC<Props> = ({ className }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [duration, setDuration] = useState<"Day" | "Week" | "Month">("Day");

  const fetchData = async () => {
    let startDate: string;
    let endDate: string = moment().endOf("day").format("YYYY-MM-DD");

    switch (duration) {
      case "Day":
        startDate = moment().startOf("day").format("YYYY-MM-DD");
        break;
      case "Week":
        startDate = moment().startOf("week").format("YYYY-MM-DD");
        break;
      case "Month":
        startDate = moment().startOf("month").format("YYYY-MM-DD");
        break;
      default:
        startDate = moment().startOf("month").format("YYYY-MM-DD");
    }

    try {
      const data = await getSubscriptionsByDateRange(startDate, endDate);
      if (data?.data) {
        setSubscriptions(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [duration]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            LATEST API SUBSCRIPTIONS
          </span>
        </h3>
        <div className="card-toolbar">
          <ul className="nav">
            {["Month", "Week", "Day"].map((d) => (
              <li className="nav-item" key={d}>
                <a
                  className={`nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary ${
                    duration === d ? "active fw-bold" : ""
                  } px-4 me-1`}
                  onClick={() => setDuration(d as "Day" | "Week" | "Month")}
                >
                  {d}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        <div className="tab-content">
          {/* begin::Tap pane */}
          <div
            className="tab-pane fade show active"
            id="kt_table_widget_5_tab_1"
          >
            {/* begin::Table container */}
            <div className="table-responsive">
              {/* begin::Table */}
              <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                {/* begin::Table head */}
                <thead>
                  <tr className="border-0">
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">CUS NAME</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">USER ID</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">SUB ID</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">SUB DATE</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">EXP DATE</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">INV DATE</span>
                    </th>
                    <th className="p-0 min-w-140px text-center">
                      <span className="text-muted fw-bold">INV NO</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">ALLOTED CALLS</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">USED CALLS</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">PENDING CALLS</span>
                    </th>
                    <th className="p-0 min-w-50px text-center">
                      <span className="text-muted fw-bold">Verified</span>
                    </th>
                    <th className="p-0 min-w-50px text-center">
                      <span className="text-muted fw-bold">Status</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">CREATED ON</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">CREATED BY</span>
                    </th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {subscriptions.map((subscription, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted fw-semibold">
                        {subscription.CUS_NAME}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {subscription.user_id}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {subscription.SUBSCRIPTION_ID}
                      </td>
                      <td className="text-center">
                        {moment(subscription.SUBSCRIPTION_DATE).format(
                          "DD/MMM/YYYY"
                        )}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {moment(subscription.expiry_date).format("DD/MMM/YYYY")}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {moment(subscription.INV_DATE).format("DD/MMM/YYYY")}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {subscription.INV_NO}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {subscription.ALLOTED_CALLS}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {subscription.USED_CALLS}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {subscription.PENDING_CALLS}
                      </td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={subscription.IS_VERIFIED}
                          onChange={async () => {
                            try {
                              await updateSubscription({
                                ...subscription,
                                SUBSCRIPTION_DATE: moment(
                                  subscription.SUBSCRIPTION_DATE
                                ).format("YYYY-MM-DD"),
                                expiry_date: moment(
                                  subscription.expiry_date
                                ).format("YYYY-MM-DD"),
                                INV_DATE: moment(subscription.INV_DATE).format(
                                  "YYYY-MM-DD"
                                ),
                                IS_VERIFIED: !subscription.IS_VERIFIED,
                              });
                              fetchData();
                            } catch (error) {
                              console.error(
                                "Failed to update subscription:",
                                error
                              );
                            }
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge badge-light-${
                            subscription.is_active === 1 ? "success" : "danger"
                          } badge-pill`}
                        >
                          {subscription.is_active === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        {moment(subscription.created_on).format("DD/MMM/YYYY")}
                      </td>
                      <td className="text-center text-muted fw-semibold">
                        {subscription.created_by}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ApiSubscriptionTable };
