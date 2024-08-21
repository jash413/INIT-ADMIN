import { FC } from "react";
import { Link } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  badgeColor: string;
  status: string;
  startDate: string;
  endDate: string;
  invoiceDate: string | undefined;
  invoiceNumber: string | undefined;
  allotedCalls: string | undefined;
  usedCalls: string | undefined;
  pendingCalls: string | undefined;
  handleEditSubscription: any;
  handleDeleteSubscription: any;
  subscription: any;
};

const ApiSubscriptionCard: FC<Props> = ({
  badgeColor,
  status,
  startDate,
  endDate,
  invoiceDate,
  invoiceNumber,
  allotedCalls,
  usedCalls,
  pendingCalls,
  handleEditSubscription,
  handleDeleteSubscription,
  subscription,
}) => {
  return (
    <div className="card border border-2 border-gray-300 border-hover">
      <div className="card-header border-0 pt-9 d-flex justify-content-between align-items-center text-truncate">
        <Link
          to="#"
          className="fs-3 fw-bolder text-hover-primary text-gray-900 mt-1"
        >
          {subscription?.USR_ID}
        </Link>
        <span>
          <button
            onClick={() => handleEditSubscription(subscription)}
            className="btn btn-icon btn-bg-light btn-active-color-primary border-2 border-hover border-gray-300 me-2"
          >
            <KTIcon iconName="notepad-edit" className="fs-1" />
          </button>
          <button
            onClick={() => handleDeleteSubscription(subscription)}
            className="btn btn-icon btn-bg-light btn-active-color-danger border-2 border-hover border-gray-300"
          >
            <KTIcon iconName="trash" className="fs-1" />
          </button>
        </span>
      </div>

      <div className="card-body p-9">
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-gray-500 fw-bold fs-5 mt-1 mb-7">
            {subscription?.system_name}
          </p>
          <p className={`badge badge-light-${badgeColor} fw-bolder px-4 py-3`}>
            {status}
          </p>
        </div>
        <div className="d-flex flex-wrap">
          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{startDate}</div>
            <div className="fw-bold text-gray-500">Start Date</div>
          </div>

          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{endDate}</div>
            <div className="fw-bold text-gray-500">End Date</div>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{invoiceDate}</div>
            <div className="fw-bold text-gray-500">Invoice Date</div>
          </div>

          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{invoiceNumber}</div>
            <div className="fw-bold text-gray-500">Invoice Number</div>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{allotedCalls}</div>
            <div className="fw-bold text-gray-500">Alloted Calls</div>
          </div>

          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{usedCalls}</div>
            <div className="fw-bold text-gray-500">Used Calls</div>
          </div>
        </div>
        <div className="d-flex flex-wrap mb-5">
          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{pendingCalls}</div>
            <div className="fw-bold text-gray-500">Pending Calls</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ApiSubscriptionCard };
