import { useEffect, useState } from "react";
import moment from "moment";
import { Content } from "../../../../../_metronic/layout/components/content";
import { KTIcon } from "../../../../../_metronic/helpers";
import {
  approveAccessRequest,
  denyAccessRequest,
  getEmployersAccessReq,
  grantProfileAccess,
  revokeProfileAccess,
} from "../core/_requests";
import clsx from "clsx";
import { Card6 } from "../../../../../_metronic/partials/content/cards/Card6";
import {
  EmployersAccessRequestType,
  FilterType,
  PaginationType,
} from "../core/_models";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type AccessRequestListProps = {
  showAll?: boolean; // New optional prop
};

const AccessRequestList: React.FC<AccessRequestListProps> = ({
  showAll = false,
}) => {
  const { id } = useParams<{ id: string }>();
  const [employers, setEmployers] = useState<EmployersAccessRequestType[] | []>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
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
    search: "",
    employerId: showAll ? undefined : (id && parseInt(id)) || null, // Adjust employerId based on showAll
    status: undefined,
  });

  const fetchEmployers = async () => {
    setLoading(true);
    try {
      if (filters.status === "") {
        delete filters.status;
      }
      const data = await getEmployersAccessReq(filters);
      setEmployers(data?.records || []);
      setPagination({
        totalItems: data?.pagination?.totalItems || 0,
        totalPages: data?.pagination?.totalPages || 0,
        currentPage: data?.pagination?.currentPage || 1,
        hasNextPage: data?.pagination?.hasNextPage || false,
        hasPreviousPage: data?.pagination?.hasPreviousPage || false,
      });
    } catch (error) {
      console.error("Fetch Employers Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

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
      links.push({ label: "Previous", page: (filters.page || 1) - 1 });
    }
    for (let i = 1; i <= pagination.totalPages; i++) {
      links.push({ label: `${i}`, page: i });
    }
    if (pagination.hasNextPage) {
      links.push({ label: "Next", page: (filters.page || 1) + 1 });
    }
    return links;
  };

  const paginationLinks = generatePaginationLinks();

  const handleApproveEmployer = (employer: EmployersAccessRequestType) => {
    approveAccessRequest(employer.id)
      .then(() => {
        toast.success("Employer approved successfully");
        fetchEmployers();
      })
      .catch((error) => {
        console.error("Approve Employer Error:", error);
      });
  };

  const handleDenyEmployer = (employer: EmployersAccessRequestType) => {
    denyAccessRequest(employer.id)
      .then(() => {
        toast.success("Employer denied successfully");
        fetchEmployers();
      })
      .catch((error) => {
        console.error("Denied Employer Error:", error);
      });
  };

  const handleGrantEmployer = (employer: EmployersAccessRequestType) => {
    grantProfileAccess({
      employerId: employer.employerId,
      candidateId: employer.candidateId,
    })
      .then(() => {
        toast.success("Employer granted successfully");
        fetchEmployers();
      })
      .catch((error) => {
        console.error("Granted Employer Error:", error);
      });
  };

  const handleRevokeEmployer = (employer: EmployersAccessRequestType) => {
    revokeProfileAccess({
      employerId: employer.employerId,
      candidateId: employer.candidateId,
    })
      .then(() => {
        toast.success("Employer revoked successfully");
        fetchEmployers();
      })
      .catch((error) => {
        console.error("Revoked Employer Error:", error);
      });
  };

  return (
    <Content>
      <div className="d-flex align-items-center justify-content-between mb-6">
        <div className="d-flex align-items-center position-relative my-1">
          <KTIcon
            iconName="magnifier"
            className="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            data-kt-user-table-filter="search"
            className="form-control form-control-solid w-250px ps-14"
            placeholder="Search..."
            value={filters.search || ""}
            onChange={handleSearchChange}
          />
        </div>

        <div className="d-flex align-items-center position-relative my-1">
          <select
            className="form-select form-select-solid w-250px"
            value={filters.status || ""}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row g-6 g-xl-9">
          {employers.length > 0 ? (
            employers.map((employee: EmployersAccessRequestType) => (
              <div key={employee.id} className="col-md-6 col-xl-3">
                <Card6
                  badgeColor={
                    employee.status === "approved"
                      ? "success"
                      : employee.status === "rejected"
                      ? "danger"
                      : "warning"
                  }
                  status={
                    employee?.status?.charAt(0)?.toUpperCase() +
                    employee?.status.slice(1)
                  }
                  title={employee?.Employer?.cmp_name}
                  subTitle={employee?.Candidate?.can_name}
                  reqDate={moment(employee?.requestedAt).format("DD/MM/YYYY")}
                  handleApproveEmployer={() => handleApproveEmployer(employee)}
                  handleDenyEmployer={() => handleDenyEmployer(employee)}
                  handleGrantEmployer={() => handleGrantEmployer(employee)}
                  handleRevokeEmployer={() => handleRevokeEmployer(employee)}
                  employee={employee}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No Access Request Found</div>
          )}
        </div>
      )}

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
                    disabled:
                      loading ||
                      (link.label === "Previous" &&
                        !pagination.hasPreviousPage) ||
                      (link.label === "Next" && !pagination.hasNextPage),
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
    </Content>
  );
};

export default AccessRequestList;
