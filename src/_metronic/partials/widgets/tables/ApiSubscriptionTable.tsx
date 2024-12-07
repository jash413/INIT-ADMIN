import React, { FC, useEffect, useState } from "react";
import {
  getSubscriptionsByDateRange,
  updateSubscription,
} from "../../../../app/modules/apicustomerprofile/subscriptionCore/_requests";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Subscription } from "../../../../app/modules/apicustomerprofile/subscriptionCore/_models";

type Props = {
  className: string;
};

const predefinedRanges = [
  {
    label: "Last 7 Days",
    value: "7days",
    range: [moment().subtract(7, "days"), moment()],
  },
  {
    label: "Last 30 Days",
    value: "30days",
    range: [moment().subtract(30, "days"), moment()],
  },
  {
    label: "This Month",
    value: "thisMonth",
    range: [moment().startOf("month"), moment().endOf("month")],
  },
  {
    label: "Last Month",
    value: "lastMonth",
    range: [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  },
  { label: "Custom Range", value: "custom" },
];

const ApiSubscriptionTable: FC<Props> = ({ className }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [dateRange, setDateRange] = useState("7days");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchData = async () => {
    let start: string;
    let end: string;

    if (dateRange === "custom" && startDate && endDate) {
      start = moment(startDate).format("YYYY-MM-DD");
      end = moment(endDate).format("YYYY-MM-DD");
    } else {
      const selectedRange = predefinedRanges.find((r) => r.value === dateRange);
      if (selectedRange && selectedRange.range) {
        start = selectedRange.range[0].format("YYYY-MM-DD");
        end = selectedRange.range[1].format("YYYY-MM-DD");
      } else {
        start = moment().startOf("month").format("YYYY-MM-DD");
        end = moment().endOf("day").format("YYYY-MM-DD");
      }
    }

    try {
      const data = await getSubscriptionsByDateRange(start, end);
      if (data?.data) {
        setSubscriptions(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange, startDate, endDate]);

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDateRange(value);
    if (value !== "custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

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
          <div className="d-flex align-items-center">
            <select
              className="form-select form-select-sm me-2 text-gray-600 fw-bold fs-6 rounded-3 cursor-pointer shadow-none w-auto"
              value={dateRange}
              onChange={handleDateRangeChange}
            >
              {predefinedRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            {dateRange === "custom" && (
              <DatePicker
                selectsRange={true}
                startDate={startDate as Date}
                endDate={endDate as Date}
                onChange={(update: [Date | null, Date | null]) => {
                  setStartDate(update[0]);
                  setEndDate(update[1]);
                }}
                className="form-control form-control-sm text-center bg-white border border-gray-300 text-gray-700 fw-bold fs-6 px-3 py-2 rounded shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto"
                placeholderText="Select date range"
              />
            )}
          </div>
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
