import { FC, useEffect, useState } from "react";
import moment from "moment";
import { Content } from "../../../../../_metronic/layout/components/content";
import { KTIcon } from "../../../../../_metronic/helpers";
import { getEmployersJobPost, updateJobPostStatus } from "../core/_requests";
import clsx from "clsx";
import { FilterType, IJobPost, PaginationType, UpdateJobStatusPayload } from "../core/_models";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Card7 } from "../../../../../_metronic/partials/content/cards/Card7";
import ManageAccessModal from "./ManageAccessModal";

type Props = {
    showCompanyDetails?: boolean;
};
const JobPostList: FC<Props> = ({ showCompanyDetails = false }) => {
    const { id } = useParams<{ id: string }>();
    const [employers, setEmployers] = useState<IJobPost[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isManageOpen, setIsManageOpen] = useState<{
        data: any;
        show: boolean;
    }>({ data: null, show: false });
    const [pagination, setPagination] = useState<PaginationType>({
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
    });
    const [filters, setFilters] = useState<FilterType>({
        page: 1,
        limit: 10,
        // search: "",
        cmp_id: id ? parseInt(id) : undefined,
    });


    const fetchEmployers = async () => {
        setLoading(true);
        try {
            const data = await getEmployersJobPost(filters);
            setEmployers(data?.records || []);
            setPagination({
                totalItems: data?.pagination?.totalItems || 0,
                totalPages: data?.pagination?.totalPages || 0,
                currentPage: data?.pagination?.currentPage || 1,
                hasNextPage: data?.pagination?.hasNextPage || false,
                hasPreviousPage: data?.pagination?.hasPreviousPage || false,
            });
        } catch (error) {
            console.error("Fetch job post Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, search: e.target.value, page: 1 });
    };

    // const handlePageChange = (direction: "prev" | "next") => {
    //     setFilters((prev: any) => ({
    //         ...prev,
    //         page: direction === "next" ? prev.page + 1 : prev.page - 1,
    //     }));
    // };


    useEffect(() => {
        fetchEmployers();
    }, [filters]);

    const updatePage = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const mappedLabel = (label: string) => {
        if (label === "&laquo; Previous") return "Previous";
        if (label === "Next &raquo;") return "Next";
        return label;
    };

    const generatePaginationLinks = () => {
        const links = [];
        if (pagination.hasPreviousPage) {
            links.push({ label: 'Previous', page: (filters.page || 1) - 1 });
        }
        for (let i = 1; i <= pagination.totalPages; i++) {
            links.push({ label: `${i}`, page: i });
        }
        if (pagination.hasNextPage) {
            links.push({ label: 'Next', page: (filters.page || 1) + 1 });
        }
        return links;
    };

    const paginationLinks = generatePaginationLinks();

    const handleStatusChange = (id: number, payload: UpdateJobStatusPayload) => {
        const previousEmployers = [...employers];
        setEmployers((prev) =>
            prev.map((job) =>
                job.job_id === id ? { ...job, status: payload.status } : job
            )
        );

        updateJobPostStatus(id, payload)
            .then(() => {
                toast.success("Job post status updated successfully");
            })
            .catch((error) => {
                toast.error(
                    `Failed to update job post status: ${error?.response?.data?.message || error.message}`
                );
                setEmployers(previousEmployers);
            });
    };



    return (
        <Content>
            <div className="d-flex flex-wrap flex-stack mb-6">
                <div className="d-flex align-items-center position-relative my-1">
                    <KTIcon
                        iconName="magnifier"
                        className="fs-1 position-absolute ms-6"
                    />
                    <input
                        type="text"
                        data-kt-user-table-filter="search"
                        className="form-control form-control-solid w-250px ps-14"
                        placeholder="Search Employer..."
                        value={filters.search || ""}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* <div className="d-flex flex-wrap my-2">
                    <button
                        // onClick={handleNewEmployee}
                        className="btn btn-primary btn-sm"
                    >
                        <KTIcon iconName="plus" className="fs-2" />
                        New Employee
                    </button>
                </div> */}
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="row g-6 g-xl-9">
                    {employers.length > 0 ? (
                        employers.map((employee: IJobPost) => (
                            <div
                                key={employee.job_id}
                                className="col-md-6 col-xl-3"
                            >
                                <Card7
                                    badgeColor={employee.status === "active" ? "success" : "warning"}
                                    status={employee?.status}
                                    jobTitle={employee?.job_title}
                                    jobCategory={employee?.job_category?.cate_desc}
                                    companyDetails={employee?.employer}
                                    date={moment(employee?.posted_at).format("DD/MM/YYYY")}
                                    handleStatusChange={handleStatusChange}
                                    showCompanyDetails={showCompanyDetails}
                                    data={employee}
                                    handleManage={() => {
                                        setIsManageOpen({
                                            data: employee,
                                            show: true,
                                        });
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center">No employers found</div>
                    )}
                </div>
            )}
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
                                        disabled: loading || (link.label === 'Previous' && !pagination.hasPreviousPage) || (link.label === 'Next' && !pagination.hasNextPage),
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
            {isManageOpen.show && (
                <ManageAccessModal
                    show={isManageOpen.show}
                    data={isManageOpen.data}
                    onClose={() => setIsManageOpen({ data: null, show: false })}
                />
            )}
        </Content>
    );
};

export default JobPostList;
