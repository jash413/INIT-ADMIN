import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  badgeColor: string;
  status: string;
  title: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  paymentDate?: string | undefined;
  licenseUsers?: number;
  mobile?: string;
  handleEditEmployee?: any;
  handleDeleteEmployee?: any;
  employee?: any;
};

const Card3: FC<Props> = ({
  badgeColor,
  status,
  title,
  startDate,
  endDate,
  mobile,
  handleEditEmployee,
  handleDeleteEmployee,
  employee,
}) => {
  return (
    <div className="card border border-2 border-gray-300 border-hover">
      <div className="card-header border-0 pt-9">
        <div className="fs-3 fw-bolder text-gray-900 mt-1">{title}</div>
        <div className="card-toolbar">
          <span>
            <button
              onClick={() => handleEditEmployee(employee)}
              className="btn btn-icon btn-bg-light btn-active-color-primary border-2 border-hover border-gray-300 me-2"
            >
              <KTIcon iconName="notepad-edit" className="fs-1" />
            </button>
            <button
              onClick={() => handleDeleteEmployee(employee)}
              className="btn btn-icon btn-bg-light btn-active-color-danger border-2 border-hover border-gray-300"
            >
              <KTIcon iconName="trash" className="fs-1" />
            </button>
          </span>
        </div>
      </div>

      <div className="card-body p-9">
        <div className="d-flex justify-content-between align-items-center">
          <a
            href={`tel:${mobile}`}
            className="text-gray-500 text-hover-primary fw-bold fs-5 mt-1 mb-7"
          >
            PH: {mobile}
          </a>
          <p className={`badge badge-light-${badgeColor} fw-bolder px-4 py-3`}>
            {status}
          </p>
        </div>
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
      </div>
    </div>
  );
};

export { Card3 };
