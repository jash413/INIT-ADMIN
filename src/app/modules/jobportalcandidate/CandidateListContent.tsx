import { FC, useState } from "react";
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers";
import moment from "moment";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCandidatesList } from "./core/useGetCandidatesList";
import {
  updateOpenToJobStatus,
  updateUserApprovalStatus,
} from "../jobportalemployer/employees-list/core/_requests";
import axios from "axios";
import { REQ } from "./core/_.request";

interface CandidateListContentProps {
  showWithoutApproval?: boolean;
  showOpenToJob?: boolean;
}

const CandidateListContent: FC<CandidateListContentProps> = ({
  showWithoutApproval = false,
  showOpenToJob = false,
}) => {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | "">("");
  const [statusUpdates, setStatusUpdates] = useState<Record<number, number>>(
    {}
  );

  const { data, isLoading, refetch } = useGetCandidatesList({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    sortBy: sortOrder ? sortBy : undefined,
    sortOrder: sortOrder || undefined,
    user_approval_status:
      pathname === "/dashboard" && showWithoutApproval ? 0 : undefined,
    open_to_job: pathname === "/dashboard" && showOpenToJob ? 1 : undefined,
  });

  const records = data?.records || [];
  const pagination = data?.pagination || {};

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prev) =>
        prev === "ASC" ? "DESC" : prev === "DESC" ? "" : "ASC"
      );
    } else {
      setSortBy(column);
      setSortOrder("ASC");
    }
  };

  const mappedLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case "previous":
        return "Previous";
      case "next":
        return "Next";
      default:
        return label;
    }
  };

  const generatePaginationLinks = () => {
    const links = [];
    if (pagination.hasPreviousPage)
      links.push({ label: "Previous", page: currentPage - 1 });
    for (let i = 1; i <= pagination.totalPages; i++)
      links.push({ label: `${i}`, page: i });
    if (pagination.hasNextPage)
      links.push({ label: "Next", page: currentPage + 1 });
    return links;
  };

  const paginationLinks = generatePaginationLinks();

  const updatePage = (page: number) => setCurrentPage(page);

  const handleSwitchChange = async (loginId: number, isEnabled: boolean) => {
    const newStatus = isEnabled ? 1 : 0;
    setStatusUpdates((prev) => ({ ...prev, [loginId]: newStatus }));

    try {
      await updateUserApprovalStatus(loginId, newStatus);
      toast.success("User approval status updated successfully.");
      refetch();
    } catch {
      setStatusUpdates((prev) => {
        const updates = { ...prev };
        delete updates[loginId];
        return updates;
      });
    }
  };

  const handleOpenToStatusChange = async (
    candId: number,
    isEnabled: boolean
  ) => {
    const newStatus = isEnabled ? 1 : 0;
    const updatedRecords = records.map((record: any) =>
      record.can_code === candId
        ? { ...record, open_to_job: isEnabled }
        : record
    );
    data.records = updatedRecords;

    try {
      await updateOpenToJobStatus(candId, newStatus);
      toast.success("User open-to-job status updated successfully.");
      refetch();
    } catch {
      toast.error("Failed to update open-to-job status.");
      data.records = records.map((record: any) =>
        record.can_code === candId
          ? { ...record, open_to_job: !newStatus }
          : record
      );
    }
  };

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
      link.remove();
    } catch {
      console.error("Error downloading the file.");
    }
  };

  return (
    <div className="p-10">
      <KTCard>
        <div className="pt-5 px-10">
          <div className="d-flex align-items-center position-relative my-1">
            <KTIcon
              iconName="magnifier"
              className="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              className="form-control form-control-solid w-250px ps-14"
              placeholder="Search..."
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
              <table className="table align-middle table-row-dashed fs-6 gy-5">
                <thead>
                  <tr className="text-muted fw-bold fs-7 text-uppercase">
                    {[
                      "ID",
                      "Candidate Name",
                      "Email",
                      "Mobile",
                      "Job Category",
                      "Created At",
                      "Resume",
                      "Open to Job",
                      "Action",
                    ].map((header, idx) => (
                      <th
                        key={idx}
                        onClick={() =>
                          handleSort(header.toLowerCase().replace(/ /g, "_"))
                        }
                      >
                        {header}
                        {sortBy === header.toLowerCase().replace(/ /g, "_") && (
                          <i
                            className={clsx("bi", {
                              "bi-chevron-up": sortOrder === "ASC",
                              "bi-chevron-down": sortOrder === "DESC",
                            })}
                          ></i>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-600 fw-bold">
                  {records.map((record: any) => {
                    const userApprovalStatus =
                      statusUpdates[record.login_id] ??
                      record.Login?.user_approval_status;

                    return (
                      <tr key={record.login_id}>
                        <td>
                          <Link
                            className="text-gray-800 text-hover-primary mb-1"
                            to={`/jobportal-candidate-management/${record.can_code}/candidate`}
                          >
                            {record.can_code}
                          </Link>
                        </td>
                        <td>{record.can_name}</td>
                        <td>{record.can_email}</td>
                        <td>{record.can_mobn}</td>
                        <td>{record.job_category.cate_desc}</td>
                        <td>{moment(record.createdAt).format("YYYY-MM-DD")}</td>
                        <td>
                          {record.can_resume ? (
                            <span
                              onClick={() =>
                                handleDownload(record.can_code, record.can_name)
                              }
                              style={{ cursor: "pointer" }}
                              className="text-primary fw-bold"
                            >
                              <i className="bi bi-download me-2"></i>Resume
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
                              checked={record.open_to_job}
                              onChange={(e) =>
                                handleOpenToStatusChange(
                                  record.can_code,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={userApprovalStatus === 1}
                              onChange={(e) =>
                                handleSwitchChange(
                                  record.login_id,
                                  e.target.checked
                                )
                              }
                            />
                            <label className="form-check-label">
                              {userApprovalStatus === 1
                                ? "Approved"
                                : "Pending"}
                            </label>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="d-flex text-center w-100 justify-content-center">
                No matching records found
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center">
              <span>
                Showing page {pagination.currentPage} of {pagination.totalPages}
              </span>
            </div>
            <div className="col-md-7 d-flex justify-content-end">
              <ul className="pagination">
                {paginationLinks.map((link) => (
                  <li
                    key={link.label}
                    className={clsx("page-item", {
                      active: currentPage === link.page,
                      disabled:
                        isLoading ||
                        (link.label === "Previous" &&
                          !pagination.hasPreviousPage) ||
                        (link.label === "Next" && !pagination.hasNextPage),
                    })}
                  >
                    <a
                      className="page-link"
                      onClick={() => updatePage(link.page)}
                      style={{
                        cursor:
                          link.page === currentPage ? "default" : "pointer",
                      }}
                    >
                      {mappedLabel(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </div>
  );
};

export default CandidateListContent;
