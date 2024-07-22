import { FC, useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { getEmployeeById, searchEmployees } from "../employeeCore/_requests";
import { Employee } from "../../employeeallotment/employees-list/core/_models";
import moment from "moment";
import { EmployeeEditModalForm } from "./EmployeeEditModalForm";
import { useDebounce, KTIcon } from "../../../../_metronic/helpers";
import { Card3 } from "../../../../_metronic/partials/content/cards/Card3";

interface EmployeesProps {
  id: string;
}

const Employees: FC<EmployeesProps> = ({ id }) => {
  const [employees, setEmployees] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const debouncedSearchTerm = useDebounce(searchTerm, 150);

  useEffect(() => {
    fetchEmployees(); // Fetch employees on initial load or ID change
  }, [id]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true); // Set loading to true before starting the search
      searchEmployees(debouncedSearchTerm, id)
        .then((data) => {
          setEmployees(data?.data || []);
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the search is complete
        });
    } else {
      fetchEmployees(); // Re-fetch all employees if search term is cleared
    }
  }, [debouncedSearchTerm]);

  const fetchEmployees = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const data = await getEmployeeById(id);
      setEmployees(data);
    } catch (error) {
      console.error("Fetch Employees Error:", error);
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  const handleNewEmployee = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
            placeholder="Search Employee..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="d-flex flex-wrap my-2">
          <button
            onClick={handleNewEmployee}
            className="btn btn-primary btn-sm"
          >
            <KTIcon iconName="plus" className="fs-2" />
            New Employee
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div> // Display loading indicator
      ) : (
        <div className="row g-6 g-xl-9">
          {employees.length > 0 ? (
            employees.map((employee: Employee) => (
              <div
                key={employee.EMP_CODE}
                className="col-md-6 col-xl-4"
                onClick={() => handleEditEmployee(employee)}
              >
                <Card3
                  badgeColor={employee.EMP_ACTV  ? "success" : "danger"}
                  status={employee.EMP_ACTV ? "Active" : "Inactive"}
                  title={employee.EMP_NAME}
                  description={employee.EMP_MAIL}
                  startDate={moment(employee?.SUB_STDT).format("DD/MM/YYYY")}
                  endDate={moment(employee?.SUB_ENDT).format("DD/MM/YYYY")}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No employees found</div>
          )}
        </div>
      )}

      {isModalOpen && (
        <EmployeeEditModalForm
          employee={selectedEmployee || ({} as Employee)}
          isEmployeeLoading={false}
          onClose={handleCloseModal}
          onEmployeeSaved={fetchEmployees}
        />
      )}
    </Content>
  );
};

export { Employees };

