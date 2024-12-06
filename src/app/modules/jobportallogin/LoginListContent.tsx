import { useState } from 'react';
import { KTCard, KTCardBody, KTIcon } from '../../../_metronic/helpers';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useGetLoginList } from './core/useGetLoginList';
import { deleteUserById } from './core/_request';

type FiltersType = {
    user_approval_status?: number;
    profile_created?: number;
    phone_ver_status?: number;
    email_ver_status?: number;
};

const LoginListContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | ''>('');
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        user_approval_status: undefined,
        profile_created: undefined,
        phone_ver_status: undefined,
        email_ver_status: undefined,
    });
    const [appliedFilters, setAppliedFilters] = useState({});

    const { data, isLoading, refetch } = useGetLoginList({
        page: currentPage,
        limit: 5,
        search: searchTerm,
        sortBy: sortOrder.trim() !== "" ? sortBy : undefined,
        sortOrder: sortOrder.trim() !== "" ? sortOrder : undefined,
        ...appliedFilters,
    });

    const records = data?.records || [];
    const pagination = data?.pagination || {};

    const toggleFilter = (key: keyof FiltersType) => {
        setFilters((prev) => ({
            ...prev,
            [key]: prev[key] === 1 ? 0 : 1,
        }));
    };

    const resetFilters = () => {
        setFilters({
            user_approval_status: undefined,
            profile_created: undefined,
            phone_ver_status: undefined,
            email_ver_status: undefined,
        });
        setAppliedFilters({});
        refetch();
    };

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

    const handleRemoveUser = (userId: number) => {
        deleteUserById(userId)
            .then(() => {
                toast.success('User removed successfully');
                refetch();
            })
            .catch((error) => {
                toast.error(`${error?.response?.data?.message || error.message}`);
            });
    };


    return (
        <div className="p-10">
            <KTCard>
                <div className="pt-5 px-10 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center position-relative my-1">
                        <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                        <input
                            type="text"
                            data-kt-user-table-filter="search"
                            className="form-control form-control-solid w-250px ps-14"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowFilter(!showFilter)}
                                className="btn btn-light-primary me-3"
                                data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end"
                            >
                                <KTIcon iconName="filter" className="fs-2 me-2" />
                                Filter
                            </button>
                        </div>
                        {showFilter && (
                            <div
                                className="bg-white border rounded shadow position-absolute p-5 mb-3"
                                style={{
                                    top: '70px',
                                    right: '40px',
                                    zIndex: 1000,
                                }}
                            >
                                <div className="row mb-3 mt-3">
                                    <div className="col-12">
                                        <div className="form-check form-switch mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={filters.user_approval_status === 1}
                                                onChange={() => toggleFilter("user_approval_status")}
                                            />
                                            <label className="form-check-label">User Approval Status</label>
                                        </div>
                                        <div className="form-check form-switch mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={filters.profile_created === 1}
                                                onChange={() => toggleFilter("profile_created")}
                                            />
                                            <label className="form-check-label">Profile Created</label>
                                        </div>
                                        <div className="form-check form-switch mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={filters.phone_ver_status === 1}
                                                onChange={() => toggleFilter("phone_ver_status")}
                                            />
                                            <label className="form-check-label">Phone Verified</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={filters.email_ver_status === 1}
                                                onChange={() => toggleFilter("email_ver_status")}
                                            />
                                            <label className="form-check-label">Email Verified</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end mt-5">
                                    <button
                                        className="btn btn-light btn-active-light-primary me-2"
                                        onClick={resetFilters}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            setAppliedFilters(filters);
                                            refetch()
                                        }}
                                        disabled={filters.user_approval_status === undefined && filters.profile_created === undefined && filters.phone_ver_status === undefined && filters.email_ver_status === undefined}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
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
                                        <th onClick={() => handleSort('login_name')}>Name
                                            {' '}
                                            {sortBy === 'login_name' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('login_email')}>Email{' '}
                                            {sortBy === 'login_email' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th onClick={() => handleSort('login_mobile')}>Mobile{' '}
                                            {sortBy === 'login_mobile' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th onClick={() => handleSort('email_ver_status')}>Email Verification {' '}
                                            {sortBy === 'email_ver_status' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th onClick={() => handleSort('phone_ver_status')}>Phone Verification {' '}
                                            {sortBy === 'phone_ver_status' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th onClick={() => handleSort('user_approval_status')}>User Approval {' '}
                                            {sortBy === 'user_approval_status' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th onClick={() => handleSort('profile_created')}>Profile Completed {' '}
                                            {sortBy === 'profile_created' && (
                                                <i
                                                    className={clsx('bi', {
                                                        'bi-chevron-up': sortOrder === 'ASC',
                                                        'bi-chevron-down': sortOrder === 'DESC',
                                                    })}
                                                ></i>
                                            )}</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 fw-bold">
                                    {records.map((record: any) => {
                                        return (
                                            <tr key={record.login_id}>
                                                <td>{record.login_name}</td>
                                                <td>{record.login_email ?? "-"}</td>
                                                <td>{record.login_mobile ?? "-"}</td>
                                                <td>
                                                    <span className={`badge text-white ${record.email_ver_status === 1 ? "bg-primary" : "bg-warning"}`}>
                                                        {record.email_ver_status === 1 ? "Approved" : "Pending"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge text-white ${record.phone_ver_status === 1 ? "bg-primary" : "bg-warning"}`}>
                                                        {record.phone_ver_status === 1 ? "Approved" : "Pending"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge text-white ${record.user_approval_status === 1 ? "bg-primary" : "bg-warning"}`}>
                                                        {record.user_approval_status === 1 ? "Approved" : "Pending"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge text-white ${record.profile_created === 1 ? "bg-primary" : "bg-warning"}`}>
                                                        {record.profile_created === 1 ? "Approved" : "Pending"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button onClick={() =>
                                                        handleRemoveUser(record.login_id)
                                                    } title='Remove User' className="btn btn-primary px-4 py-2 w-100">
                                                        Remove
                                                    </button>
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
            </KTCard >
        </div >
    );
};

export default LoginListContent;
