import { FC, useEffect, useState } from "react";
import { IJobPost } from "../../../../app/modules/jobportalemployer/employees-list/core/_models";
import { Link } from "react-router-dom";

type Props = {
    badgeColor: string;
    status: string;
    jobTitle: string;
    jobCategory: string;
    companyDetails: {
        cmp_name: string;
        cmp_email: string;
        cmp_mobn: string;
        emp_loca: string;
        emp_addr: string;
    };
    date: string;
    showCompanyDetails?: boolean;
    handleStatusChange?: any;
    handleManage?: any;
    data?: IJobPost;
    isLoadingStatus?: any;
};

const Card7: FC<Props> = ({
    badgeColor,
    status,
    jobTitle,
    jobCategory,
    companyDetails,
    date,
    showCompanyDetails = false,
    handleStatusChange,
    handleManage,
    data,
    isLoadingStatus,
}) => {

    const [isActive, setIsActive] = useState(status === "active");

    const handleToggle = () => {
        const newStatus = isActive ? "inactive" : "active";
        setIsActive((prev) => !prev);
        const payload = {
            job_title: data?.job_title,
            job_description: data?.job_description,
            job_cate: data?.job_cate,
            salary: data?.salary,
            required_skills: data?.required_skills,
            status: newStatus,
        }
        handleStatusChange(data?.job_id, payload);
    };

    return (
        <div className="card border border-2 border-gray-300 border-hover">
            <div className="card-header row border-0 pt-9 w-max" >
                <Link to={`/jobportal-job-post-management/${data?.job_id}/job-applications`}>
                    <div className="w-100">
                        <div className="fs-3 fw-bolder text-gray-900 text-hover-primary mt-1 text-truncate">
                            Job Title: {jobTitle}
                        </div>
                        <div className="fs-5 fw-bolder text-gray-700 text-hover-primary mt-1 text-truncate">
                            Job Category: {jobCategory}
                        </div>
                    </div>
                </Link>
            </div>

            <div className="card-body p-9">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
                        <div className="fs-6 text-gray-800 fw-bolder">{date}</div>
                        <div className="fw-bold text-gray-500">Posted Date</div>
                    </div>
                    <div className="d-flex flex-column justify-content-end align-items-end">
                        <p className={`badge badge-light-${badgeColor} fw-bolder px-4 py-3`}>{status.charAt(0)?.toUpperCase() + status.slice(1)}</p>
                        <div className="d-flex align-items-center">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`toggle-${data?.job_id}`}
                                    disabled={isLoadingStatus(data?.job_id)}
                                    checked={status === "active"}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleToggle()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {showCompanyDetails && (
                    <Link to={`/jobportal-employer-profile/${data?.cmp_id}/access-request/`} className="card-toolbar mt-3">
                        <div className="mt-4 custom-hover">
                            <div className="text-gray-800 text-hover-primary fw-bold text-truncate">
                                <strong>Company Name:</strong> {companyDetails.cmp_name}
                            </div>
                            <div className="text-gray-800 text-hover-primary fw-bold text-truncate">
                                <strong>Email:</strong> {companyDetails.cmp_email}
                            </div>
                            <div className="text-gray-800 text-hover-primary fw-bold text-truncate">
                                <strong>Phone:</strong> {companyDetails.cmp_mobn}
                            </div>
                            <div className="text-gray-800 text-hover-primary fw-bold text-truncate">
                                <strong>Location:</strong> {companyDetails.emp_loca}
                            </div>
                            <div className="text-gray-800 text-hover-primary fw-bold text-truncate">
                                <strong>Address:</strong> {companyDetails.emp_addr}
                            </div>
                        </div>
                    </Link>
                )}
                <div className="mt-5">
                    <button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleManage()
                    }} className="btn btn-primary px-4 py-2 w-100">
                        Manage
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Card7 };
