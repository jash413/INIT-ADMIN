import { FC } from "react";
import { EmployersAccessRequestType } from "../../../../app/modules/jobportalemployer/employees-list/core/_models";

type Props = {
    badgeColor: string;
    status: string;
    title: string | undefined;
    reqDate: string | undefined;
    subTitle: string | undefined;
    handleApproveEmployer?: any;
    handleDenyEmployer?: any;
    handleGrantEmployer?: any;
    handleRevokeEmployer?: any;
    employee?: EmployersAccessRequestType;
};

const Card6: FC<Props> = ({
    badgeColor,
    status,
    title,
    reqDate,
    subTitle,
    handleApproveEmployer,
    handleDenyEmployer,
    handleGrantEmployer,
    handleRevokeEmployer,
    employee,
}) => {
    const isGranted = (status === "Approved" || status === "Rejected")
    return (
        <div className="card border border-2 border-gray-200">
            <div className="card-header row border-0 pt-9 w-max">
                <div className="">
                    <div className="fs-3 fw-bolder text-gray-900 mt-1 text-truncate">Company: {title}</div>
                    <div className="fs-5 fw-bolder text-gray-700 mt-1 text-truncate">Candidate: {subTitle}</div>
                </div>

            </div>

            <div className="card-body p-9">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
                        <div className="fs-6 text-gray-800 fw-bolder">{reqDate}</div>
                        <div className="fw-bold text-gray-500">Request Date</div>
                    </div>
                    <p className={`badge badge-light-${badgeColor} fw-bolder px-4 py-3`}>
                        {status}
                    </p>
                </div>
                <div className="card-toolbar mt-3">
                    <span className="d-flex justify-content-start align-items-center">
                        {status !== "Approved" && (
                            <button
                                onClick={() => {
                                    if (!isGranted) {
                                        handleApproveEmployer(employee)
                                    } else {
                                        handleGrantEmployer(employee)
                                    }
                                }}
                                className={`btn btn-success me-2`}
                            >
                                {!isGranted ? (
                                    <>
                                        <i className="bi bi-check-square"></i>
                                        <span className="fs-6 text-white fw-bolder ml-5">Approve</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-shield-check"></i>
                                        <span className="fs-6 text-white fw-bolder ml-5">Grant</span>
                                    </>
                                )}
                            </button>
                        )}
                        {status !== "Rejected" && (
                            <button
                                onClick={() => {
                                    if (!isGranted) {
                                        handleDenyEmployer(employee)
                                    } else {
                                        handleRevokeEmployer(employee)
                                    }
                                }
                                }
                                className={`btn btn-danger`}
                            >
                                {!isGranted ? (
                                    <>
                                        <i className="bi bi-x-square"></i>
                                        <span className="fs-6 text-white fw-bolder ml-5">Deny</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-ban"></i>
                                        <span className="fs-6 text-white fw-bolder ml-5">Revoke</span>
                                    </>
                                )}
                            </button>
                        )}
                    </span>
                </div>

            </div>
        </div >
    );
};

export { Card6 };
