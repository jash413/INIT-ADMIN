import axios, { AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ID, Response } from "../../../../../_metronic/helpers";
import { Subscription, SubscriptionsQueryResponse } from "./_models";


const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const SUBSCRIPTION_URL = `${API_URL}/api/subscriptions`;
const GET_SUBSCRIPTIONS_URL = `${API_URL}/api/subscriptions`;

const getSubscriptions = (query: string): Promise<SubscriptionsQueryResponse> => {
  return axios
    .get(`${GET_SUBSCRIPTIONS_URL}?${query}`)
    .then((d: AxiosResponse<SubscriptionsQueryResponse>) => d.data)
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
};

const getSubscriptionById = (id: ID): Promise<Subscription | undefined> => {
  return axios
    .get(`${SUBSCRIPTION_URL}/${id}`)
    .then((response: AxiosResponse<Response<Subscription>>) => response.data)
    .then((response: Response<Subscription>) => response.data)
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
};

const createSubscription = (subscription: Subscription): Promise<Subscription | undefined> => {
  return axios
    .post(SUBSCRIPTION_URL, subscription)
    .then((response: AxiosResponse<Response<Subscription>>) => response.data)
    .then((response: Response<Subscription>) => response.data)
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
};

const updateSubscription = (subscription: Subscription): Promise<Subscription | undefined> => {
  return axios
    .put(`${SUBSCRIPTION_URL}/${subscription.SUB_CODE}`, subscription)
    .then((response: AxiosResponse<Response<Subscription>>) => response.data)
    .then((response: Response<Subscription>) => response.data)
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
};

const deleteSubscription = (subscriptionId: ID): Promise<void> => {
  return axios
    .delete(`${SUBSCRIPTION_URL}/${subscriptionId}`)
    .then(() => {})
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
};

const deleteSelectedSubscriptions = (subscriptionIds: Array<ID>): Promise<void> => {
  const requests = subscriptionIds.map((id) => axios.delete(`${SUBSCRIPTION_URL}/${id}`));
  return axios
    .all(requests)
    .then(() => {})
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
};

const fetchCustomers = (): Promise<any> => {
  return axios
    .get(`${API_URL}/api/customers`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
}

const fetchPlans = (): Promise<any> => {
  return axios
    .get(`${API_URL}/api/sub-plans`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
}

const getPlanById = (id: ID): Promise<any> => {
  return axios
    .get(`${API_URL}/api/sub-plans/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`${error.response.data.message}`);
      throw error;
    });
}

export {
  getSubscriptions,
  deleteSubscription,
  deleteSelectedSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  fetchCustomers,
  fetchPlans,
  getPlanById,
};
