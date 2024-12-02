import { FC, useState } from "react";
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
}) => {

    const [isActive, setIsActive] = useState(status === "active");

    // {
    //     "job_title": "Junior FE(React JS)",
    //     "job_description": "<ul>\n<li aria-level=\"1\">Bachelor&rsquo;s degree in computer science, software development, engineering, or a related technical field</li>\n<li aria-level=\"1\">Proficient with the latest versions of ECMAScript (JavaScript) as well as HTML and CSS</li>\n<li aria-level=\"1\">Knowledge of React and common tools used in the wider React ecosystem, such as Node.js and npm</li>\n<li aria-level=\"1\">Familiarity with common programming tools such as Redux, IDEs, RESTful APIs, Git repositories, TypeScript, version control software, and remote deployment tools</li>\n<li aria-level=\"1\">An understanding of common programming paradigms and fundamental React principles, such as React components, hooks, and the React lifecycle</li>\n</ul>",
    //     "job_cate": 5,
    //     "job_location": "Ahmedabad",
    //     "salary": 2500000,
    //     "required_skills": "React JS,HTML,CSS,JS",
    //     "status": "inactive"
    // }

    const handleToggle = () => {
        const newStatus = isActive ? "inactive" : "active";
        setIsActive(!isActive);
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
                <div className="w-100">
                    <div className="fs-3 fw-bolder text-gray-900 mt-1 text-truncate">
                        Job Title: {jobTitle}
                    </div>
                    <div className="fs-5 fw-bolder text-gray-700 mt-1 text-truncate">
                        Job Category: {jobCategory}
                    </div>
                </div>
            </div>

            <div className="card-body p-9">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
                        <div className="fs-6 text-gray-800 fw-bolder">{date}</div>
                        <div className="fw-bold text-gray-500">Posted Date</div>
                    </div>
                    <div className="d-flex flex-column justify-content-end align-items-center">
                        <p className={`badge badge-light-${badgeColor} fw-bolder px-4 py-3`}>{status.charAt(0)?.toUpperCase() + status.slice(1)}</p>
                        <div className="d-flex align-items-center">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`toggle-${data?.job_id}`}
                                    checked={isActive}
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

                <Link to={`/jobportal-employer-profile/${data?.cmp_id}/access-request/`} className="card-toolbar mt-3">
                    {showCompanyDetails && (
                        <div className="mt-4">
                            <div className="text-gray-800 fw-bold text-truncate">
                                <strong>Company Name:</strong> {companyDetails.cmp_name}
                            </div>
                            <div className="text-gray-800 fw-bold text-truncate">
                                <strong>Email:</strong> {companyDetails.cmp_email}
                            </div>
                            <div className="text-gray-800 fw-bold text-truncate">
                                <strong>Phone:</strong> {companyDetails.cmp_mobn}
                            </div>
                            <div className="text-gray-800 fw-bold text-truncate">
                                <strong>Location:</strong> {companyDetails.emp_loca}
                            </div>
                            <div className="text-gray-800 fw-bold text-truncate">
                                <strong>Address:</strong> {companyDetails.emp_addr}
                            </div>
                        </div>
                    )}
                </Link>
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
