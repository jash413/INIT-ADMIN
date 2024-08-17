import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ID, Response } from "../../../../_metronic/helpers";
import { Employee, EmployeesQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const EMPLOYEE_URL = `${API_URL}/api/employees`;
const GET_EMPLOYEES_URL = `${API_URL}/api/employees`;
const GET_ADMINS_URL = `${API_URL}/api/admins`;

const getEmployees = (query: string): Promise<EmployeesQueryResponse> => {
  return axios
    .get(`${GET_EMPLOYEES_URL}?${query}`)
    .then((d: AxiosResponse<EmployeesQueryResponse>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get employees: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const getAdmins = (): Promise<any> => {
  return axios
    .get(GET_ADMINS_URL)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get admins: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const getAllEmployees = (): Promise<any> => {
  return axios
    .get(`${EMPLOYEE_URL}`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to get employees: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const searchEmployees = (
  query: string,
  id: ID
): Promise<EmployeesQueryResponse> => {
  return axios
    .get(`${GET_EMPLOYEES_URL}/${id}?search=${query}`)
    .then((d: AxiosResponse<EmployeesQueryResponse>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to search employees: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const getEmployeeById = (id: ID): Promise<Employee | undefined> => {
  return axios
    .get(`${EMPLOYEE_URL}/${id}`)
    .then((response: AxiosResponse<Response<Employee>>) => response.data)
    .then((response: Response<Employee>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to get employee by ID: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const getEmployeesByIdAndQuery = (
  id: ID,
  query: string
): Promise<EmployeesQueryResponse> => {
  const url = `${GET_EMPLOYEES_URL}/${id}${query ? `?${query}` : ""}`;

  return axios
    .get(url)
    .then((d: AxiosResponse<EmployeesQueryResponse>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get employees by ID and query: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const createEmployee = (employee: Employee): Promise<Employee | undefined> => {
  return axios
    .post(EMPLOYEE_URL, employee)
    .then((response: AxiosResponse<Response<Employee>>) => response.data)
    .then((response: Response<Employee>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to create employee: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const updateEmployee = (
  mobileNumber: string,
  employee: Employee
): Promise<Employee | undefined> => {
  return axios
    .put(`${EMPLOYEE_URL}/${mobileNumber}`, employee)
    .then((response: AxiosResponse<Response<Employee>>) => response.data)
    .then((response: Response<Employee>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to update employee: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const deleteEmployee = (employeeId: ID): Promise<void> => {
  return axios
    .delete(`${EMPLOYEE_URL}/${employeeId}`)
    .then(() => {})
    .catch((error) => {
      toast.error(
        `Failed to delete employee: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const deleteSelectedEmployees = (employeeIds: Array<ID>): Promise<void> => {
  const requests = employeeIds.map((id) =>
    axios.delete(`${EMPLOYEE_URL}/${id}`)
  );
  return axios
    .all(requests)
    .then(() => {})
    .catch((error) => {
      toast.error(
        `Failed to delete selected employees: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const fetchCustomers = (): Promise<any> => {
  return axios
    .get(`${API_URL}/api/customers`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to fetch customers: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const fetchSubscriptionsByCustomerId = (customerId: ID): Promise<any> => {
  return axios
    .get(`${API_URL}/api/subscriptions/${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to fetch subscriptions for customer: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

export {
  getEmployees,
  deleteEmployee,
  deleteSelectedEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  fetchCustomers,
  fetchSubscriptionsByCustomerId,
  searchEmployees,
  getAllEmployees,
  getAdmins,
  getEmployeesByIdAndQuery,
};
