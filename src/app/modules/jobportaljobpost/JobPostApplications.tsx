import React, { useState } from "react";
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers";
import { Link, useParams } from "react-router-dom";
import moment from "moment"; // For formatting the date
import clsx from "clsx";
import { useGetJobApplicationsByJobId } from "./core/useGetJobApplicationsByJobId";
import axios from "axios";
import { REQ } from "../jobportalcandidate/core/_.request";

const JobPostApplications = () => {
    const { id } = useParams<{ id: string }>();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading } = useGetJobApplicationsByJobId({
        page: currentPage,
        limit: 5,
        search: searchTerm,
        job_id: parseInt(id as string),
    });

    const records = data?.records || [];
    const pagination = data?.pagination || {};


    const updatePage = (page: number) => {
        setCurrentPage(page);
    };

    const mappedLabel = (label: string) => {
        if (label === "&laquo; Previous") return "Previous";
        if (label === "Next &raquo;") return "Next";
        return label;
    };

    const generatePaginationLinks = () => {
        const links = [];
        if (pagination.hasPreviousPage) {
            links.push({ label: 'Previous', page: currentPage - 1 });
        }
        for (let i = 1; i <= pagination.totalPages - 1; i++) {
            links.push({ label: `${i}`, page: i });
        }
        if (pagination.hasNextPage) {
            links.push({ label: 'Next', page: currentPage + 1 });
        }
        return links;
    };

    const paginationLinks = generatePaginationLinks();

    const handleDownload = async (id: number, fileName: string) => {
        try {
            const response = await axios.get(REQ.DOWNLOAD_CANDIDATE_RESUME(id), {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(response as any);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${fileName}_resume.pdf`);
            document.body.appendChild(link);
            link.click();
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };

    return (
        <div className="p-10">
            <KTCard>
                <div className="pt-5 px-10">
                    <div className="d-flex align-items-center position-relative my-1">
                        <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                        <input
                            type="text"
                            data-kt-user-table-filter="search"
                            className="form-control form-control-solid w-250px ps-14"
                            placeholder="Search candidates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <KTCardBody className="py-5">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-4">
                        {isLoading ? (
                            <div className="text-center">Loading...</div>
                        ) : records.length > 0 ? (
                            records.map((record: any) => {
                                return (
                                    <div
                                        key={record.login_id}
                                        className="card border shadow-sm p-5 "
                                        style={{ width: "300px" }}
                                    >
                                        <h5 className="card-title text-primary mb-5">
                                            <Link className='text-hover-primary text-truncate' to={`/jobportal-candidate-management/${record?.candidate?.can_code}/candidate`}>
                                                {record?.candidate?.can_name} - {record?.candidate?.can_code}
                                            </Link>
                                        </h5>
                                        <p className="text-muted text-truncate">
                                            <strong>Email:</strong> {record?.candidate?.can_email}
                                        </p>
                                        <p className="text-muted text-truncate">
                                            <strong>Mobile:</strong> {record?.candidate?.can_mobn}
                                        </p>
                                        <p className="text-muted text-truncate">
                                            <strong>Category:</strong> {record?.candidate?.job_category.cate_desc}
                                        </p>
                                        <p className="text-muted text-truncate">
                                            <strong>Applied on:</strong> {moment(record.appliedAt).format("YYYY-MM-DD")}
                                        </p>
                                        <div className="mb-3">
                                            {record?.can_resume?.can_resume ? (
                                                <span
                                                    onClick={() => handleDownload(record?.can_resume?.can_code, record?.can_resume?.can_name)}
                                                    style={{ cursor: "pointer" }}
                                                    className="text-primary fw-bold d-flex align-items-center"
                                                >
                                                    <i className="bi bi-download me-2 text-primary fs-3"></i> Download Resume
                                                </span>
                                            ) : (
                                                <span className="text-muted">No resume</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center">No matching records found</div>
                        )}
                    </div>
                    {/* Pagination */}
                    <div className="row my-5">
                        <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"></div>
                        <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                            <div id="kt_table_users_paginate">
                                <ul className="pagination">
                                    {paginationLinks.map((link) => (
                                        <li
                                            key={link.label}
                                            className={clsx("page-item", {
                                                active: pagination.currentPage === link.page,
                                                disabled: isLoading || (link.label === 'Previous' && !pagination.hasPreviousPage) || (link.label === 'Next' && !pagination.hasNextPage),
                                            })}
                                        >
                                            <a
                                                className="page-link"
                                                onClick={() => updatePage(link.page)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {mappedLabel(link.label)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </KTCardBody>
            </KTCard>
        </div >
    );
};

export default JobPostApplications;
