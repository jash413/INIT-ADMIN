import { FC, useEffect, useState } from "react";
import { KTIcon } from "../../../helpers";
import {
  getNearbyExpiringSubscriptions,
  sendEmailReminder,
  sendWhatsAppReminder,
} from "../../../../app/modules/customerprofile/subscriptionCore/_requests";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

type Props = {
  className: string;
};

type Subscription = {
  SUB_CODE: string;
  INV_DATE: string;
  SUB_ORDN: string;
  SUB_STDT: string;
  SUB_ENDT: string;
  customer_name: string;
  admin_name: string;
  LIC_USER: number;
  remainder_mail: number | null;
  remainder_whatsapp: number | null;
};

const TablesWidget1: FC<Props> = ({ className }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[] | any>([]);

  const fetchData = async () => {
    try {
      const data = await getNearbyExpiringSubscriptions();
      if (data?.data) {
        setSubscriptions(data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendMessage = async (subscription: Subscription) => {
    try {
      await sendWhatsAppReminder(subscription.SUB_CODE);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      fetchData();
    }
  };

  const handleSendEmail = async (subscription: Subscription) => {
    try {
      await sendEmailReminder(subscription.SUB_CODE);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      fetchData();
    }
  };

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            SUBSCRIPTIONS EXPIRING IN NEXT 7 DAYS
          </span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        <div className="tab-content">
          {/* begin::Tab pane */}
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
                    <th className="p-0 w-150px text-center">
                      <span className="text-muted fw-bold">
                        Subscription Code
                      </span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">Customer Name</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">Created By</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">Invoice Date</span>
                    </th>
                    <th className="p-0 min-w-140px text-center">
                      <span className="text-muted fw-bold">Invoice Number</span>
                    </th>
                    <th className="p-0 min-w-120px text-center">
                      <span className="text-muted fw-bold">Users</span>
                    </th>
                    <th className="p-0 min-w-120px text-center">
                      <span className="text-muted fw-bold">Start Date</span>
                    </th>
                    <th className="p-0 min-w-110px text-center">
                      <span className="text-muted fw-bold">End Date</span>
                    </th>
                    <th className="p-0 min-w-150px text-center">
                      <span className="text-muted fw-bold">Actions</span>
                    </th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {subscriptions.map(
                    (subscription: Subscription, index: any) => (
                      <tr key={index}>
                        <td className="text-center">
                          <Link
                            to={`/subscription-profile/${subscription.SUB_CODE}`}
                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            {subscription.SUB_CODE}
                          </Link>
                        </td>
                        <td className="text-center text-muted fw-semibold">
                          {subscription.customer_name}
                        </td>
                        <td className="text-center text-muted fw-semibold">
                          {subscription.admin_name}
                        </td>
                        <td className="text-center text-muted fw-semibold">
                          {moment(subscription.INV_DATE).format("DD/MMM/YYYY")}
                        </td>
                        <td className="text-center text-muted fw-semibold">
                          {subscription.SUB_ORDN}
                        </td>
                        <td className="text-center">{subscription.LIC_USER}</td>
                        <td className="text-center text-muted fw-semibold">
                          {moment(subscription.SUB_STDT).format("DD/MMM/YYYY")}
                        </td>
                        <td className="text-center text-muted fw-semibold">
                          {moment(subscription.SUB_ENDT).format("DD/MMM/YYYY")}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => {
                              if (subscription.remainder_whatsapp === 0) {
                                handleSendMessage(subscription);
                              } else {
                                toast.error("Reminder already sent");
                              }
                            }}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          >
                            <KTIcon iconName="whatsapp" className="fs-1" />
                          </button>
                          <button
                            onClick={() => {
                              if (subscription.remainder_mail === 0) {
                                handleSendEmail(subscription);
                              } else {
                                toast.error("Reminder already sent");
                              }
                            }}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                          >
                            <KTIcon iconName="messages" className="fs-1" />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tab pane */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
};

export { TablesWidget1 };
