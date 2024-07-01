import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Content } from "../../../../_metronic/layout/components/content";
import { Card2 } from "../../../../_metronic/partials/content/cards/Card2";
import { getEmployeeById } from "../../employeeallotment/employees-list/core/_requests";
import { Employee } from "../../employeeallotment/employees-list/core/_models";
import moment from "moment";

interface EmployeesProps {
  id: string;
}

const Employees: FC<EmployeesProps> = ({ id }) => {
  const [employees, setEmployees] = useState<any>([]);
  useEffect(() => {
    getEmployeeById(id).then(async (data) => {
      setEmployees(data);
    });
  }, [id]);

  return (
    <Content>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">Employees</h3>

        <div className="d-flex flex-wrap my-2">
          <Link
            to={`/employee-allotment/employees`}
            className="btn btn-primary btn-sm"
          >
            New Employee Allotment
          </Link>
        </div>
      </div>
      <div className="row g-6 g-xl-9">
        {employees.map((employee: Employee) => (
          <div className="col-md-6 col-xl-4">
            <Card2
              badgeColor={employee?.EMP_ACTV ? "success" : "danger"}
              status={employee?.EMP_ACTV ? "Active" : "Inactive"}
              title={employee?.EMP_NAME}
              description={employee?.EMP_MAIL}
              startDate={moment(employee?.SUB_STDT).format("DD/MM/YYYY")}
              endDate={moment(employee?.SUB_ENDT).format("DD/MM/YYYY")}
            />
          </div>
        ))}
      </div>
    </Content>
  );
};

export { Employees };
