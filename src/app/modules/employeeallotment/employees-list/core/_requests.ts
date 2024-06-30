import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../_metronic/helpers";
import { Employee, EmployeesQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const EMPLOYEE_URL = `${API_URL}/api/employees`;
const GET_EMPLOYEES_URL = `${API_URL}/api/employees`;

const getEmployees = (query: string): Promise<EmployeesQueryResponse> => {
  return axios
    .get(`${GET_EMPLOYEES_URL}?${query}`)
    .then((d: AxiosResponse<EmployeesQueryResponse>) => d.data);
};

const getEmployeeById = (id: ID): Promise<Employee | undefined> => {
  return axios
    .get(`${EMPLOYEE_URL}/${id}`)
    .then((response: AxiosResponse<Response<Employee>>) => response.data)
    .then((response: Response<Employee>) => response.data);
};

const createEmployee = (user: Employee): Promise<Employee | undefined> => {
  return axios
    .post(EMPLOYEE_URL, user)
    .then((response: AxiosResponse<Response<Employee>>) => response.data)
    .then((response: Response<Employee>) => response.data);
};

const updateEmployee = (user: Employee): Promise<Employee | undefined> => {
  return axios
    .put(`${EMPLOYEE_URL}/${user.CUS_CODE}`, user)
    .then((response: AxiosResponse<Response<Employee>>) => response.data)
    .then((response: Response<Employee>) => response.data);
};

const deleteEmployee = (userId: ID): Promise<void> => {
  return axios.delete(`${EMPLOYEE_URL}/${userId}`).then(() => {});
};

const deleteSelectedEmployees = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${EMPLOYEE_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

const fetchCustomers = (): Promise<any> => {
  return axios
    .get(`${API_URL}/api/customers`)
    .then((response) => response.data);
};

const fetchSubscriptionsByCustomerId = (
  customerId: ID
): Promise<any> => {
  return axios
    .get(`${API_URL}/api/subscriptions/${customerId}`)
    .then((response) => response.data);
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
};
