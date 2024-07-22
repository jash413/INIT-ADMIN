import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlanById } from "../../../../app/modules/customerprofile/subscriptionCore/_requests";

type Props = {
  badgeColor: string;
  status: string;
  title: string | undefined;
  description: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  paymentDate?: string | undefined;
  licenseUsers?: number;
};

const Card3: FC<Props> = ({
  badgeColor,
  status,
  title,
  description,
  startDate,
  endDate,
  paymentDate,
  licenseUsers,
}) => {
  const [plan, setPlan] = useState<any>({});

  const getPlan = async () => {
    const response = await getPlanById(description ? description : "");
    setPlan(response.data);
  };

  useEffect(() => {
    getPlan();
  }, [description]);

  return (
    <Link to="#" className="card border border-2 border-gray-300 border-hover">
      <div className="card-header border-0 pt-9">
        <div className="fs-3 fw-bolder text-gray-900 mt-1">{title}</div>
        <div className="card-toolbar">
          <span
            className={`badge badge-light-${badgeColor} fw-bolder me-auto px-4 py-3`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="card-body p-9">
        {description && (
          <p className="text-gray-500 fw-bold fs-5 mt-1 mb-7">
            Plan - {plan?.PLA_DESC}
          </p>
        )}
        <div className="d-flex flex-wrap mb-5">
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
            <div className="fs-6 text-gray-800 fw-bolder">{paymentDate}</div>
            <div className="fw-bold text-gray-500">Payment Date</div>
          </div>

          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{licenseUsers}</div>
            <div className="fw-bold text-gray-500">License Users</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { Card3 };
