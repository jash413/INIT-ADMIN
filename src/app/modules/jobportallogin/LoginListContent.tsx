import { useState } from "react";
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useGetLoginList } from "./core/useGetLoginList";
import { deleteUserById, updateUserApprovalStatus } from "./core/_request";

type FiltersType = {
  user_approval_status?: number;
  profile_created?: number;
  phone_ver_status?: number;
  email_ver_status?: number;
};

const LoginListContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [login_type, setLoginType] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | "">("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    user_approval_status: undefined,
    profile_created: undefined,
    phone_ver_status: undefined,
    email_ver_status: undefined,
  });
  const [appliedFilters, setAppliedFilters] = useState<FiltersType>({});

  const { data, isLoading, refetch } = useGetLoginList({
    page: currentPage,
    limit: 5,
    search: searchTerm,
    sortBy: sortOrder.trim() !== "" ? sortBy : undefined,
    sortOrder: sortOrder.trim() !== "" ? sortOrder : undefined,
    login_type: login_type.trim() !== "" ? login_type : undefined,
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
        prevOrder === "ASC" ? "DESC" : prevOrder === "DESC" ? "" : "ASC"
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

  const handleSwitchChange = async (loginId: number, isEnabled: boolean) => {
    const newStatus = isEnabled ? 1 : 0;

    try {
      await updateUserApprovalStatus(loginId, newStatus);
      toast.success("User approval status updated successfully.");
      refetch();
    } catch {
      toast.error("Failed to update user approval status.");
    }
  };

  const generatePaginationLinks = () => {
    const links = [];
    if (pagination.hasPreviousPage) {
      links.push({ label: "Previous", page: currentPage - 1 });
    }
    for (let i = 1; i <= pagination.totalPages; i++) {
      links.push({ label: `${i}`, page: i });
    }
    if (pagination.hasNextPage) {
      links.push({ label: "Next", page: currentPage + 1 });
    }
    return links;
  };

  const paginationLinks = generatePaginationLinks();

  const updatePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleRemoveUser = (userId: number) => {
    deleteUserById(userId).then(() => {
      toast.success("User removed successfully");
      refetch();
    });
  };

  return (
    <div className="p-10">
      <KTCard>
        <div className="pt-5 px-10 d-flex align-items-center justify-content-between">
          {/* Search Input */}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Login Type Dropdown */}
          <div className="d-flex align-items-center justify-content-between my-1">
            {/* Login Type Dropdown */}
            <div className="d-flex align-items-center me-3">
              <select
                className="form-select form-select-solid w-250px"
                value={login_type}
                onChange={async (e) => {
                  await setLoginType(e.target.value);
                  refetch();
                }}
              >
                <option value="">Select Login Type</option>
                <option value="CND">Candidate</option>
                <option value="EMP">Employer</option>
              </select>
            </div>

            {/* Filter Button and Modal */}
            <div className="d-flex align-items-center">
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

              {/* Filter Modal */}
              {showFilter && (
                <div
                  className="bg-white border rounded shadow position-absolute p-5 mb-3"
                  style={{
                    top: "70px",
                    right: "40px",
                    zIndex: 1000,
                  }}
                >
                  {/* Filter Options */}
                  <div className="row mb-3 mt-3">
                    <div className="col-12">
                      {Object.keys(filters).map((key) => (
                        <div key={key} className="form-check form-switch mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={filters[key as keyof FiltersType] === 1}
                            onChange={() =>
                              toggleFilter(key as keyof FiltersType)
                            }
                          />
                          <label className="form-check-label">
                            {key
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal Actions */}
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
                        refetch();
                      }}
                      disabled={Object.values(filters).every(
                        (val) => val === undefined
                      )}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <KTCardBody className="py-5">
          <div className="table-responsive">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : records.length > 0 ? (
              <table className="table align-middle table-row-dashed fs-6 gy-5">
                <thead>
                  <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                    {[
                      "Login Type",
                      "Name",
                      "Email",
                      "Mobile",
                      "Email Verification",
                      "Phone Verification",
                      "Profile Completed",
                      "User Approval",
                      "Action",
                    ].map((col, index) => (
                      <th
                        key={index}
                        onClick={() =>
                          handleSort(col.toLowerCase().replace(/ /g, "_"))
                        }
                      >
                        {col}
                        {sortBy === col.toLowerCase().replace(/ /g, "_") && (
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
                  {records.map((record: any) => (
                    <tr key={record.login_id}>
                      <td>{record.login_type}</td>
                      <td>{record.login_name}</td>
                      <td>{record.login_email ?? "-"}</td>
                      <td>{record.login_mobile ?? "-"}</td>
                      {[
                        "email_ver_status",
                        "phone_ver_status",
                        "profile_created",
                      ].map((field) => (
                        <td key={field}>
                          <span
                            className={`badge badge-light-${
                              record[field] === 1 ? "success" : "warning"
                            } fw-bolder px-4 py-3`}
                          >
                            {record[field] === 1 ? "Approved" : "Pending"}
                          </span>
                        </td>
                      ))}
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={record.user_approval_status === 1}
                            onChange={(e) =>
                              handleSwitchChange(
                                record.login_id,
                                e.target.checked
                              )
                            }
                          />
                          <label className="form-check-label">
                            {record.user_approval_status === 1
                              ? "Approved"
                              : "Pending"}
                          </label>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveUser(record.login_id)}
                          className="btn btn-primary px-4 py-2 w-100"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="d-flex justify-content-center w-100">
                No matching records found
              </div>
            )}
          </div>
          <div className="row mt-5">
            <div className="col-md-5 d-flex align-items-center justify-content-start">
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
                      active: link.page === currentPage,
                    })}
                  >
                    <button
                      className="page-link"
                      onClick={() => updatePage(link.page)}
                    >
                      {mappedLabel(link.label)}
                    </button>
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

export default LoginListContent;
