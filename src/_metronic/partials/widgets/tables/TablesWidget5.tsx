import { FC, useEffect, useState } from "react";
import { KTIcon } from "../../../helpers";
import { getSubscriptionsByDateRange } from "../../../../app/modules/customerprofile/subscriptionCore/_requests";
import { Link } from "react-router-dom";
import moment from "moment";

type Props = {
  className: string;
};

type Subscription = {
  SUB_CODE: string;
  INV_DATE: string;
  SUB_ORDN: string;
  SUB_STDT: string;
  SUB_ENDT: string;
  status: number;
};

const TablesWidget5: FC<Props> = ({ className }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [duration, setDuration] = useState<"Day" | "Week" | "Month">("Month");

  const fetchData = async () => {
    const startDate = moment()
      .subtract(
        1,
        duration.toLowerCase() as moment.unitOfTime.DurationConstructor
      )
      .format("YYYY-MM-DD");
    const endDate = moment().format("YYYY-MM-DD");
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
            Latest Subscriptions
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
                    <th className="p-0 w-150px"></th>
                    <th className="p-0 min-w-150px"></th>
                    <th className="p-0 min-w-140px"></th>
                    <th className="p-0 min-w-120px"></th>
                    <th className="p-0 min-w-110px"></th>
                    <th className="p-0 min-w-50px"></th>
                    <th className="p-0 min-w-50px"></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {subscriptions.map((subscription, index) => (
                    <tr key={index}>
                      <td>
                        <Link
                          to={`/subscription-profile/${subscription.SUB_CODE}`}
                          className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >
                          {subscription.SUB_CODE}
                        </Link>
                      </td>
                      <td className="text-muted fw-semibold">
                        {moment(subscription.INV_DATE).format("DD/MMM/YYYY")}
                      </td>
                      <td className="text-end text-muted fw-semibold">
                        {subscription.SUB_ORDN}
                      </td>
                      <td className="text-end text-muted fw-semibold">
                        {moment(subscription.SUB_STDT).format("DD/MMM/YYYY")}
                      </td>
                      <td className="text-end text-muted fw-semibold">
                        {moment(subscription.SUB_ENDT).format("DD/MMM/YYYY")}
                      </td>
                      <td className="text-end">
                        <span
                          className={`badge badge-light-${
                            subscription.status === 1 ? "success" : "danger"
                          } badge-pill`}
                        >
                          {subscription.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to={`/subscription-profile/${subscription.SUB_CODE}`}
                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                        >
                          <KTIcon iconName="arrow-right" className="fs-2" />
                        </Link>
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

export { TablesWidget5 };
