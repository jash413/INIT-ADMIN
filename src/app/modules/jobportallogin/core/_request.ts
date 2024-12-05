/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://job-portal-backend-production.up.railway.app";
const DELETE_USER_FROM_ID = (id: number) =>
  `${API_URL}/api/v1/admin/login-data/${id}`;

const deleteUserById = (id: number): Promise<void> => {
  return axios
    .delete(`${DELETE_USER_FROM_ID(id)}`)
    .then((d) => {
      d.data;
    })
    .catch((error) => {
      toast.error(
        `Failed to deny request: ${
          error?.response?.data?.message || error.message
        }`
      );
      throw error;
    });
};

export { deleteUserById };
