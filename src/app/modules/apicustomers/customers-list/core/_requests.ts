import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ID, Response } from "../../../../../_metronic/helpers";
import { Customer, CustomersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const CUSTOMER_URL = `${API_URL}/api/gstRegistrations`;
const GET_CUSTOMERS_URL = `${API_URL}/api/gstRegistrations`;
const GET_ADMINS_URL = `${API_URL}/api/admins`;

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

const getAdminById = (id: ID): Promise<any> => {
  return axios
    .get(`${GET_ADMINS_URL}/${id}`)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get admin by ID: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const getCustomers = (query: string): Promise<CustomersQueryResponse> => {
  return axios
    .get(`${GET_CUSTOMERS_URL}?${query}`)
    .then((d: AxiosResponse<CustomersQueryResponse>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get customers: ${error.response?.data?.message || error.message}`
      );
      throw error;
    });
};

const getAllCustomers = (): Promise<any> => {
  return axios
    .get(`${CUSTOMER_URL}`)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get customers: ${error.response?.data?.message || error.message}`
      );
      throw error;
    });
}

const getCustomerById = (id: ID): Promise<Customer | undefined> => {
  return axios
    .get(`${CUSTOMER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Customer>>) => response.data)
    .then((response: Response<Customer>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to get customer by ID: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const createCustomer = (customer: Customer): Promise<Customer | undefined> => {
  return axios
    .post(CUSTOMER_URL, customer)
    .then((response: AxiosResponse<Response<Customer>>) => response.data)
    .then((response: Response<Customer>) => response.data)
    .then((data) => {
      alert("Customer created successfully with ID: " + data?.id);
      return data;
    })
    .catch((error) => {
      toast.error(
        `Failed to create customer: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const updateCustomer = (customer: Customer): Promise<Customer | undefined> => {
  return axios
    .put(`${CUSTOMER_URL}/${customer.id}`, customer)
    .then((response: AxiosResponse<Response<Customer>>) => response.data)
    .then((response: Response<Customer>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to update customer: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const deleteCustomer = (customerId: ID): Promise<void> => {
  return axios
    .delete(`${CUSTOMER_URL}/${customerId}`)
    .then(() => {})
    .catch((error) => {
      toast.error(
        `Failed to delete customer: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const deleteSelectedCustomers = (customerIds: Array<ID>): Promise<void> => {
  const requests = customerIds.map((id) => axios.delete(`${CUSTOMER_URL}/${id}`));
  return axios
    .all(requests)
    .then(() => {})
    .catch((error) => {
      toast.error(
        `Failed to delete selected customers: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

export {
  getCustomers,
  deleteCustomer,
  deleteSelectedCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  getAdmins,
  getAdminById,
  getAllCustomers
};
