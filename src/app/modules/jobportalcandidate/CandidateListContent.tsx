import { useState } from 'react';
import { KTCard, KTCardBody, KTIcon } from '../../../_metronic/helpers';
import moment from 'moment'; // For formatting the date
import clsx from 'clsx';
import { Link } from 'react-router-dom';
// import { updateUserApprovalStatus } from './employees-list/core/_requests';
import { toast } from 'react-toastify';
import { useGetCandidatesList } from './core/useGetCandidatesList';
import { updateUserApprovalStatus } from '../jobportalemployer/employees-list/core/_requests';
import axios from 'axios';
import { REQ } from './core/_.request';

const CandidateListContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | ''>('');
    const [statusUpdates, setStatusUpdates] = useState<Record<number, number>>({});

    const { data, isLoading, refetch } = useGetCandidatesList({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        sortBy: sortOrder.trim() !== "" ? sortBy : undefined,
        sortOrder: sortOrder.trim() !== "" ? sortOrder : undefined,
    });

    const records = data?.records || [];
    const pagination = data?.pagination || {};

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder((prevOrder) =>
                prevOrder === 'ASC' ? 'DESC' : prevOrder === 'DESC' ? '' : 'ASC'
            );
        } else {
            setSortBy(column);
            setSortOrder('ASC');
        }
    };

    const mappedLabel = (label: string) => {
        switch (label.toLowerCase()) {
            case 'previous':
                return 'Previous';
            case 'next':
                return 'Next';
            default:
                return label;
        }
    };

    const generatePaginationLinks = () => {
        const links = [];
        if (pagination.hasPreviousPage) {
            links.push({ label: 'Previous', page: currentPage - 1 });
        }
        for (let i = 1; i <= pagination.totalPages; i++) {
            links.push({ label: `${i}`, page: i });
        }
        if (pagination.hasNextPage) {
            links.push({ label: 'Next', page: currentPage + 1 });
        }
        return links;
    };

    const paginationLinks = generatePaginationLinks();

    const updatePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleSwitchChange = async (loginId: number, isEnabled: boolean) => {
        const newStatus = isEnabled ? 1 : 0;

        setStatusUpdates((prev) => ({ ...prev, [loginId]: newStatus }));

        try {
            await updateUserApprovalStatus(loginId, newStatus);
            toast.success('User approval status updated successfully.');
            refetch();
        } catch (error) {
            setStatusUpdates((prev) => {
                const updates = { ...prev };
                delete updates[loginId];
                return updates;
            });
        }
    };

    const handleDownload = async (id: number, fileName: string) => {
        try {
            const response = await axios.get(
                REQ.UPDATE_JOB_POST_STATUS(id),
                {
                    responseType: "blob",
                }
            );

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
                            placeholder="Search Employer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <KTCardBody className="py-5">
                    <div className="table-responsive">
                        {isLoading ? (
                            <div className="text-center">Loading...</div>
                        ) : records.length > 0 ? (
                            <table
                                id="kt_table_users"
                                className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                            >
                                <thead>
                                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                                        <th onClick={() => handleSort('can_name')}>Candidate Name
                                            {' '}
                                            {sortBy === 'can_name' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('can_email')}>Email{' '}
                                            {sortBy === 'can_email' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th onClick={() => handleSort('can_mobn')}>Mobile{' '}
                                            {sortBy === 'can_mobn' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th onClick={() => handleSort('cate_desc')}>Job Category{' '}
                                            {sortBy === 'cate_desc' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th onClick={() => handleSort('createdAt')}>Created At{' '}
                                            {sortBy === 'createdAt' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th>Resume</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 fw-bold">
                                    {records.map((record: any) => {
                                        const userApprovalStatus =
                                            statusUpdates[record.login_id] ??
                                            record.Login?.user_approval_status;
                                        return (
                                            <tr key={record.login_id}>
                                                <td>{record.can_name}</td>
                                                <td>{record.can_email}</td>
                                                <td>{record.can_mobn}</td>
                                                <td>{record.job_category.cate_desc}</td>
                                                <td>{moment(record.createdAt).format('YYYY-MM-DD')}</td>
                                                <td>
                                                    {record?.can_resume ? (
                                                        <span
                                                            onClick={() => handleDownload(record?.can_code, record.can_name)}
                                                            style={{ cursor: 'pointer' }}
                                                            className="text-primary fw-bold d-flex align-items-center"
                                                        >
                                                            <i className="bi bi-download me-2 text-primary fs-3"></i> Resume
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted">No resume</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`switch-${record.login_id}`}
                                                            checked={userApprovalStatus === 1}
                                                            onChange={(e) =>
                                                                handleSwitchChange(
                                                                    record.login_id,
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`switch-${record.login_id}`}
                                                        >
                                                            {userApprovalStatus === 1
                                                                ? 'Approved'
                                                                : 'Pending'}
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div className="d-flex text-center w-100 align-content-center justify-content-center">
                                No matching records found
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="row">
                        <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
                            <span>
                                Showing page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                        </div>
                        <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                            <div id="kt_table_employees_paginate">
                                <ul className="pagination">
                                    {paginationLinks.map((link) => (
                                        <li
                                            key={link.label}
                                            className={clsx('page-item', {
                                                active: currentPage === link.page,
                                                disabled: isLoading || (link.label === 'Previous' && !pagination.hasPreviousPage) || (link.label === 'Next' && !pagination.hasNextPage),
                                            })}
                                        >
                                            <a
                                                className="page-link"
                                                onClick={() => updatePage(link.page)}
                                                style={{ cursor: link.page === currentPage ? 'default' : 'pointer' }}
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
        </div>
    );
};

export default CandidateListContent;
