import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useGetNotAccessableCNDs } from '../core/useGetNotAccessableCNDs';
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers';
import moment from 'moment';
import axios from 'axios';
import { REQ } from '../../../jobportalcandidate/core/_.request';
import clsx from 'clsx';
import { useGrantCNDAccessById } from '../core/useGrantCNDAccessById';
import { toast } from 'react-toastify';


interface ManageAccessModalProps {
    show: boolean;
    onClose: () => void;
    title?: string;
    data?: any;
    refetchEmployersList?: any;
}


const ManageCandidateAccessModal: React.FC<ManageAccessModalProps> = ({ show, onClose, title, data, refetchEmployersList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | ''>('');

    const { data: CandidateData, isLoading, refetch } = useGetNotAccessableCNDs({
        page: currentPage,
        limit: 10,
        sortBy: sortOrder.trim() !== "" ? sortBy : undefined,
        sortOrder: sortOrder.trim() !== "" ? sortOrder : undefined,
        employerId: data,
    });

    const { mutate: grantCNDAccessById, isLoading: loading } = useGrantCNDAccessById();

    const records = CandidateData?.records || [];
    const pagination = CandidateData?.pagination || {};

    const handleGrantAccess = async (candidateId: number) => {
        try {
            grantCNDAccessById(
                {
                    employerId: data,
                    candidateId: candidateId,
                },
                {
                    onSuccess: () => {
                        refetchEmployersList();
                        refetch();
                        toast.success('Access updated successfully.');
                        onClose();
                    },
                }
            );
        } catch (error) {
            console.error('Error updating candidate access:', error);
        }
    }

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

    const handleDownload = async (id: number, fileName: string) => {
        try {
            const response = await axios.get(
                REQ.DOWNLOAD_CANDIDATE_RESUME(id),
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
        <Modal size='lg' show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title || 'Manage Access'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <KTCard>
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
                                            <th className='text-nowrap' onClick={() => handleSort('can_name')}>Name
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
                                            <th className='text-nowrap' onClick={() => handleSort('can_email')}>Email{' '}
                                                {sortBy === 'can_email' && (
                                                    <i
                                                        className={clsx('bi', {
                                                            'bi-chevron-up': sortOrder === 'ASC',
                                                            'bi-chevron-down': sortOrder === 'DESC',
                                                        })}
                                                    ></i>
                                                )}</th>
                                            <th className='text-nowrap' onClick={() => handleSort('can_mobn')}>Mobile{' '}
                                                {sortBy === 'can_mobn' && (
                                                    <i
                                                        className={clsx('bi', {
                                                            'bi-chevron-up': sortOrder === 'ASC',
                                                            'bi-chevron-down': sortOrder === 'DESC',
                                                        })}
                                                    ></i>
                                                )}</th>
                                            <th className='text-nowrap' onClick={() => handleSort('createdAt')}>Created At{' '}
                                                {sortBy === 'createdAt' && (
                                                    <i
                                                        className={clsx('bi', {
                                                            'bi-chevron-up': sortOrder === 'ASC',
                                                            'bi-chevron-down': sortOrder === 'DESC',
                                                        })}
                                                    ></i>
                                                )}</th>
                                            <th className='text-nowrap'>Resume</th>
                                            <th className='text-nowrap'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 fw-bold">
                                        {records.map((record: any) => {
                                            return (
                                                <tr key={record.login_id}>
                                                    <td className='text-nowrap'>{record.can_name}</td>
                                                    <td className='text-nowrap'>{record.can_email}</td>
                                                    <td className='text-nowrap'>{record.can_mobn}</td>
                                                    <td className='text-nowrap'>{moment(record.createdAt).format('YYYY-MM-DD')}</td>
                                                    <td className='text-nowrap'>
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
                                                        <button onClick={() => handleGrantAccess(record?.can_code)} type='button' className='btn btn-primary' disabled={loading}>Grant</button>
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

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary">
                    Grant access
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManageCandidateAccessModal;
