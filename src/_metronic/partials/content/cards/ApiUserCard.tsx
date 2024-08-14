import { FC } from "react";
import { Link } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  badgeColor: string;
  status: string;
  createdOn: string;
  handleEditUser: any;
  handleDeleteUser: any;
  user: any;
};

const ApiUserCard: FC<Props> = ({
  badgeColor,
  status,
  createdOn,
  handleEditUser,
  handleDeleteUser,
  user,
}) => {
  return (
    <div className="card border border-2 border-gray-300 border-hover">
      <div className="card-header border-0 pt-9 d-flex justify-content-between align-items-center">
        <Link
          to={`/api-user-profile/${user?.id}`}
          className="fs-3 fw-bolder text-hover-primary text-gray-900 mt-1"
        >
          USER - {user?.id}
        </Link>
        <span>
          <button
            onClick={() => handleEditUser(user)}
            className="btn btn-icon btn-bg-light btn-active-color-primary border-2 border-hover border-gray-300 me-2"
          >
            <KTIcon iconName="notepad-edit" className="fs-1" />
          </button>
          <button
            onClick={() => handleDeleteUser(user)}
            className="btn btn-icon btn-bg-light btn-active-color-danger border-2 border-hover border-gray-300"
          >
            <KTIcon iconName="trash" className="fs-1" />
          </button>
        </span>
      </div>

      <div className="card-body p-9">
        <div className="d-flex justify-content-between align-items-center">
          <a href={`mailto:${user?.USR_ID}`} className="text-gray-500 fw-bold fs-5 mt-1 mb-7 text-truncate text-hover-primary">
            {user?.USR_ID}
          </a>
          <p className={`badge badge-light-${badgeColor} fw-bolder px-4 py-3`}>
            {status}
          </p>
        </div>
        <div className="d-flex flex-wrap">
          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{user?.CREATED_BY}</div>
            <div className="fw-bold text-gray-500">Created By</div>
          </div>

          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
            <div className="fs-6 text-gray-800 fw-bolder">{createdOn}</div>
            <div className="fw-bold text-gray-500">Created On</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ApiUserCard };
