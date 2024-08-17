/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";

type Props = {
  className: string;
  chartSize?: number;
  chartLine?: number;
  chartRotate?: number;
  customers?: number;
  id?: string;
  type?: string;
  chartName?: string;
};

const ApiCard: FC<Props> = ({
  className,
  customers = 0,
  type,
  chartName,
}) => {
  return (
    <div className={`card card-flush ${className}`}>
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <div className="d-flex align-items-center">
            <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">
              {customers}
            </span>
          </div>
          <span className="text-gray-500 pt-1 fw-semibold fs-6">
            {chartName}
          </span>
        </div>
      </div>

      <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
        <div className="d-flex flex-column content-justify-center flex-row-fluid">
          <div className="d-flex fw-semibold align-items-center">
            <div className="bullet w-8px h-3px rounded-2 bg-success me-3"></div>
            <div className="text-gray-500 flex-grow-1 me-4">Active {type}</div>
            <div className="fw-bolder text-gray-700 text-xxl-end"></div>
          </div>
          <div className="d-flex fw-semibold align-items-center my-3">
            <div className="bullet w-8px h-3px rounded-2 bg-primary me-3"></div>
            <div className="text-gray-500 flex-grow-1 me-4">
              Inactive {type}
            </div>
            <div className="fw-bolder text-gray-700 text-xxl-end">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ApiCard };
