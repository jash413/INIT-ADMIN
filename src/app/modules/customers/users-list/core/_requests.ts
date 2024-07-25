import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ID, Response } from "../../../../../_metronic/helpers";
import { User, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/api/customers`;
const GET_USERS_URL = `${API_URL}/api/customers`;
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

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get users: ${error.response?.data?.message || error.message}`
      );
      throw error;
    });
};

const getAllUsers = (): Promise<any> => {
  return axios
    .get(`${USER_URL}`)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      toast.error(
        `Failed to get users: ${error.response?.data?.message || error.message}`
      );
      throw error;
    });
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to get user by ID: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(USER_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
    .then((data) => {
      alert("Customer created successfully with ID: " + data?.CUS_CODE);
      return data;
    })
    .catch((error) => {
      toast.error(
        `Failed to create user: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const updateUser = (user: User): Promise<User | undefined> => {
  return axios
    .put(`${USER_URL}/${user.CUS_CODE}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to update user: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const deleteUser = (userId: ID): Promise<void> => {
  return axios
    .delete(`${USER_URL}/${userId}`)
    .then(() => {})
    .catch((error) => {
      toast.error(
        `Failed to delete user: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
  return axios
    .all(requests)
    .then(() => {})
    .catch((error) => {
      toast.error(
        `Failed to delete selected users: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
  getAdmins,
  getAdminById,
  getAllUsers
};
