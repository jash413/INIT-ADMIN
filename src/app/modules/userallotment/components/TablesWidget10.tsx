import { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";

type Props = {
  className: string;
};

const TablesWidget10: FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            User Allotment Statistics
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        ></div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-150px">Customer Code</th>
                <th className="min-w-140px">Customer Name</th>
                <th className="min-w-120px">Sync Date</th>
                <th className="min-w-120px">Phone Number</th>
                <th className="min-w-100px text-end">Status</th>
                <th className="min-w-100px text-end">Action</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary fs-6"
                      >
                        Ana Simmons
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                  >
                    Intertico
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Web, UI/UX Design
                  </span>
                </td>
                <td>
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="me-2 fs-7 text-gray-900 fw-bold">
                        25-05-2021
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href={`tel:8320052869`}
                    className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                  >
                    8320052869
                  </a>
                </td>
                <td>
                  <div className="form-check form-check-solid form-switch fv-row d-flex justify-content-end flex-shrink-0">
                    <input
                      className="form-check-input w-45px h-30px"
                      type="checkbox"
                      id="active"
                      defaultChecked={true}
                    />
                    <label className="form-check-label"></label>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary fs-6"
                      >
                        Kevin Leonard
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                  >
                    Agoda
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Web, UI/UX Design
                  </span>
                </td>
                <td>
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="me-2 fs-7 text-gray-900 fw-bold">
                        25-05-2021
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href={`tel:8320052869`}
                    className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                  >
                    8320052869
                  </a>
                </td>
                <td>
                  <div className="form-check form-check-solid form-switch fv-row d-flex justify-content-end flex-shrink-0">
                    <input
                      className="form-check-input w-45px h-30px"
                      type="checkbox"
                      id="active"
                      defaultChecked={false}
                    />
                    <label className="form-check-label"></label>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { TablesWidget10 };
