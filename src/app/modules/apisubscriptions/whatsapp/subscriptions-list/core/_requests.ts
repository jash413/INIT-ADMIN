import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Subscription, SubscriptionsQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const SUBSCRIPTION_URL = `${API_URL}/api/UserSubscription`;
const GET_SUBSCRIPTIONS_URL = `${API_URL}/api/UserSubscription`;
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

const getSubscriptions = (query: string): Promise<SubscriptionsQueryResponse> => {
  return axios
    .get(`${GET_SUBSCRIPTIONS_URL}?filter_system_id=3&${query}`)
    .then((d: AxiosResponse<SubscriptionsQueryResponse>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get customers: ${error.response?.data?.message || error.message}`
      );
      throw error;
    });
};

const getAllSubscriptions = (): Promise<any> => {
  return axios
    .get(`${SUBSCRIPTION_URL}`)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get customers: ${error.response?.data?.message || error.message}`
      );
      throw error;
    });
}

const getSubscriptionById = (id: ID): Promise<Subscription | undefined> => {
  return axios
    .get(`${SUBSCRIPTION_URL}/${id}`)
    .then((response: AxiosResponse<Response<Subscription>>) => response.data)
    .then((response: Response<Subscription>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to get customer by ID: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const createSubscription = (customer: Subscription): Promise<Subscription | undefined> => {
  return axios
    .post(SUBSCRIPTION_URL, customer)
    .then((response: AxiosResponse<Response<Subscription>>) => response.data)
    .then((response: Response<Subscription>) => response.data)
    .then((data) => {
      alert("Subscription created successfully with ID: " + data?.id);
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

const updateSubscription = (customer: Subscription): Promise<Subscription | undefined> => {
  return axios
    .put(`${SUBSCRIPTION_URL}/${customer.id}`, customer)
    .then((response: AxiosResponse<Response<Subscription>>) => response.data)
    .then((response: Response<Subscription>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to update customer: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const deleteSubscription = (customerId: ID): Promise<void> => {
  return axios
    .delete(`${SUBSCRIPTION_URL}/${customerId}`)
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

const deleteSelectedSubscriptions = (customerIds: Array<ID>): Promise<void> => {
  const requests = customerIds.map((id) => axios.delete(`${SUBSCRIPTION_URL}/${id}`));
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
  getSubscriptions,
  deleteSubscription,
  deleteSelectedSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  getAdmins,
  getAdminById,
  getAllSubscriptions
};
